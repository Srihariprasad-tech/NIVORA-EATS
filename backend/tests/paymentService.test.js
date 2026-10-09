
process.env.RAZORPAY_KEY_ID = "rzp_test_fake";
process.env.RAZORPAY_SECRET = "unit_test_secret";

const mockRazorpay = {
    orders: {
        create: jest.fn()
    },
    payments: {
        fetch: jest.fn()
    }
};

jest.mock("razorpay", () => {
    return jest.fn(() => mockRazorpay);
});

jest.mock("../src/models/cart", () => ({
    findOne: jest.fn()
}));

jest.mock("../src/models/payments", () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));

const crypto = require("crypto");
const Payment = require("../src/models/payments");
const service = require("../src/services/paymentService");

describe("Payment verification service", () => {
    const userId = "user123";
    const orderId = "order_test_123";
    const paymentId = "pay_test_123";
    const amountInPaise = 127000;

    let record;

    // Generate the correct signature for successful verification tests.
    const generateSignature = () => {
        return crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_SECRET
            )
            .update(`${orderId}|${paymentId}`)
            .digest("hex");
    };

    beforeEach(() => {
        jest.clearAllMocks();

        record = {
            user: userId,
            razorpayOrderId: orderId,
            razorpayPaymentId: null,
            amount: 1270,
            currency: "INR",
            status: "created",
            verified: false,
            save: jest.fn().mockResolvedValue(true)
        };

        Payment.findOne.mockResolvedValue(record);

        mockRazorpay.payments.fetch.mockResolvedValue({
            id: paymentId,
            order_id: orderId,
            amount: amountInPaise,
            currency: "INR",
            status: "captured"
        });
    });

    test("rejects missing verification fields", async () => {
        await expect(
            service.verifypayment(
                userId,
                orderId,
                "",
                ""
            )
        ).rejects.toThrow(
            "Missing or invalid payment verification fields"
        );

        expect(
            mockRazorpay.payments.fetch
        ).not.toHaveBeenCalled();
    });

    test("rejects an invalid signature", async () => {
        // 64 hexadecimal characters, but not the correct signature.
        const invalidSignature = "a".repeat(64);

        await expect(
            service.verifypayment(
                userId,
                orderId,
                paymentId,
                invalidSignature
            )
        ).rejects.toThrow("Invalid payment signature");

        expect(
            mockRazorpay.payments.fetch
        ).not.toHaveBeenCalled();
    });

    test("rejects when the payment record is missing", async () => {
        Payment.findOne.mockResolvedValue(null);

        await expect(
            service.verifypayment(
                userId,
                orderId,
                paymentId,
                generateSignature()
            )
        ).rejects.toThrow("Payment record not found");

        expect(
            mockRazorpay.payments.fetch
        ).not.toHaveBeenCalled();
    });

    test("marks a captured payment as paid", async () => {
        const result = await service.verifypayment(
            userId,
            orderId,
            paymentId,
            generateSignature()
        );

        expect(result.status).toBe("paid");
        expect(result.verified).toBe(true);
        expect(result.razorpayPaymentId).toBe(paymentId);

        expect(
            mockRazorpay.payments.fetch
        ).toHaveBeenCalledWith(paymentId);

        expect(record.save).toHaveBeenCalledTimes(1);
    });

    test("rejects a payment that is not captured", async () => {
        mockRazorpay.payments.fetch.mockResolvedValue({
            id: paymentId,
            order_id: orderId,
            amount: amountInPaise,
            currency: "INR",
            status: "authorized"
        });

        await expect(
            service.verifypayment(
                userId,
                orderId,
                paymentId,
                generateSignature()
            )
        ).rejects.toThrow("Payment has not been captured");

        expect(record.save).not.toHaveBeenCalled();
    });

    test("rejects a payment with the wrong order ID", async () => {
        mockRazorpay.payments.fetch.mockResolvedValue({
            id: paymentId,
            order_id: "order_different",
            amount: amountInPaise,
            currency: "INR",
            status: "captured"
        });

        await expect(
            service.verifypayment(
                userId,
                orderId,
                paymentId,
                generateSignature()
            )
        ).rejects.toThrow("Payment order ID mismatch");

        expect(record.save).not.toHaveBeenCalled();
    });

    test("rejects a payment with the wrong amount", async () => {
        mockRazorpay.payments.fetch.mockResolvedValue({
            id: paymentId,
            order_id: orderId,
            amount: 10000,
            currency: "INR",
            status: "captured"
        });

        await expect(
            service.verifypayment(
                userId,
                orderId,
                paymentId,
                generateSignature()
            )
        ).rejects.toThrow(
            "Payment amount or currency mismatch"
        );

        expect(record.save).not.toHaveBeenCalled();
    });
});

