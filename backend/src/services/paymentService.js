
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Cart = require("../models/cart");
const Payment = require("../models/payments");

// Make sure .env is loaded before this service is imported.
if (
    !process.env.RAZORPAY_KEY_ID ||
    !process.env.RAZORPAY_SECRET
) {
    throw new Error(
        "Razorpay environment variables are missing. Check your .env file."
    );
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

const DELIVERY_FEE = 40;
const CURRENCY = "INR";

// Round a monetary value to two decimal places.
const roundMoney = (amount) =>
    Math.round((amount + Number.EPSILON) * 100) / 100;

// --------------------------------------------------
// 1. CREATE RAZORPAY ORDER
// --------------------------------------------------
const createpaymentorder = async (userid) => {
    if (!userid) {
        throw new Error("User ID is required");
    }

    // Find the logged-in user's cart.
    const usercart = await Cart.findOne({ user: userid });

    if (!usercart || !usercart.items || usercart.items.length === 0) {
        throw new Error("Cart not found or empty");
    }

    let subtotal = 0;

    // Calculate the subtotal.
    // IMPORTANT: For production, retrieve prices from trusted Food
    // documents instead of trusting prices stored in the cart.
    for (const item of usercart.items) {
        const price = Number(item.price);
        const quantity = Number(item.quantity);

        if (
            !Number.isFinite(price) ||
            price <= 0 ||
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            throw new Error("Invalid cart item price or quantity");
        }

        subtotal += price * quantity;
    }

    subtotal = roundMoney(subtotal);

    const grandTotal = roundMoney(subtotal + DELIVERY_FEE);
    const amountInPaise = Math.round(grandTotal * 100);

    if (
        !Number.isSafeInteger(amountInPaise) ||
        amountInPaise <= 0
    ) {
        throw new Error("Invalid payment amount");
    }

    // Create an order with Razorpay.
    const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: CURRENCY,
        receipt: `rcpt_${crypto.randomUUID()
            .replace(/-/g, "")
            .slice(0, 20)}`
    });

    // Save our internal payment record.
    try {
        const paymentData = await Payment.create({
            user: userid,
            razorpayOrderId: razorpayOrder.id,
            amount: grandTotal,
            currency: CURRENCY,
            status: "created",
            verified: false
        });

        return {
            paymentid: paymentData._id,
            razorpayOrderId: razorpayOrder.id,
            amount: amountInPaise,
            currency: CURRENCY,
            keyid: process.env.RAZORPAY_KEY_ID
        };
    } catch (error) {
        // Razorpay's order may exist even if MongoDB saving fails.
        console.error(
            "Could not save payment record for Razorpay order:",
            razorpayOrder.id,
            error.message
        );

        throw new Error(
            "Razorpay order was created, but the payment record could not be saved. Contact support before retrying."
        );
    }
};

// --------------------------------------------------
// 2. VERIFY RAZORPAY PAYMENT
// --------------------------------------------------
const verifypayment = async (
    userid,
    razorpayorderid,
    razorpaypaymentid,
    razorpaysignature
) => {
    if (!userid) {
        throw new Error("User authentication is required");
    }

    // Validate all required values.
    if (
        typeof razorpayorderid !== "string" ||
        typeof razorpaypaymentid !== "string" ||
        typeof razorpaysignature !== "string" ||
        !razorpayorderid.trim() ||
        !razorpaypaymentid.trim() ||
        !/^[a-f0-9]{64}$/i.test(razorpaysignature)
    ) {
        throw new Error(
            "Missing or invalid payment verification fields"
        );
    }

    // Find a payment record belonging to this user and order.
    const paymentData = await Payment.findOne({
        razorpayOrderId: razorpayorderid,
        user: userid
    });

    if (!paymentData) {
        throw new Error("Payment record not found");
    }

    // Verify the signature using your Razorpay secret.
    const secret = process.env.RAZORPAY_SECRET;

    if (!secret) {
        throw new Error("Payment configuration error");
    }

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpayorderid}|${razorpaypaymentid}`)
        .digest("hex");

    const receivedBuffer = Buffer.from(
        razorpaysignature,
        "hex"
    );

    const expectedBuffer = Buffer.from(
        expectedSignature,
        "hex"
    );

    if (
        receivedBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(
            receivedBuffer,
            expectedBuffer
        )
    ) {
        throw new Error("Invalid payment signature");
    }

    // A retry is successful only for the same payment.
    if (paymentData.status === "paid" && paymentData.verified === true) {
        if (paymentData.razorpayPaymentId === razorpaypaymentid) {
            return paymentData;
        }

        throw new Error("Payment already processed");
    }

    // Ask Razorpay for the actual payment details.
    const razorpayPayment = await razorpay.payments.fetch(
        razorpaypaymentid
    );

    // Confirm the payment belongs to this Razorpay order.
    if (
        razorpayPayment.id !== razorpaypaymentid ||
        razorpayPayment.order_id !== razorpayorderid
    ) {
        throw new Error("Payment order ID mismatch");
    }

    // Do not mark authorized or failed payments as paid.
    if (razorpayPayment.status !== "captured") {
        throw new Error("Payment has not been captured");
    }

    // Confirm amount and currency match our database record.
    const expectedAmount = Math.round(
        Number(paymentData.amount) * 100
    );

    if (
        !Number.isSafeInteger(expectedAmount) ||
        razorpayPayment.amount !== expectedAmount ||
        razorpayPayment.currency !== paymentData.currency
    ) {
        throw new Error("Payment amount or currency mismatch");
    }

    // Update MongoDB after every check succeeds.
    paymentData.razorpayPaymentId = razorpaypaymentid;
    paymentData.status = "paid";
    paymentData.verified = true;

    await paymentData.save();

    return paymentData;
};

module.exports = {
    createpaymentorder,
    verifypayment
};
