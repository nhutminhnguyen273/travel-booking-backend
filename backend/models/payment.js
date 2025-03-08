const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "booking",
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            // required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["VND", "USD"],
            default: "VND"
        },
        paymentMethod: {
            type: String,
            enum: ["VNPay", "MoMo"],
            required: true
        },
        transactionId: {
            type: String,
            unique: true,
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending"
        },
        paidAt: {
            type: Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("payment", PaymentSchema);