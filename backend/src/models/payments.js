const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        razorpayOrderId: { // given by the razorpay//
            type: String,
            required: true,
            unique: true
        },
        razorpayPaymentId: { // paymentid after ccreating order
            type: String,
            default: null
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            default: "INR"
        },
        status: {
            type: String,
            enum: [
                "created",
                "pending",
                "paid",
                "failed",
                "refunded"
            ],
            default: "created"
        },
        method: {
            type: String,
            default: null
        },
        verified: {  // this tells tht backend tht payment has been cryptographicaly verifed
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("payment", paymentSchema);