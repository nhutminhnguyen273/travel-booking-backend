const mongoose = require("mongoose");
const Currency = require("../enums/currency.enum");
const PaymentMethod = require("../enums/payment-method.enum");
const PaymentStatus = require("../enums/payment-status.enum");

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
            required: true
        },
        currency: {
            type: String,
            enum: Object.values(Currency),
            required: true,
            default: Currency.VND
        },
        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethod),
            default: PaymentMethod.VNPay
        },
        transactionId: {
            type: String,
            unique: true,
            required: true
        },
        paymentStatus: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.Pending
        },
        paidAt: {
            type: Date,
        }
    }
);

module.exports = mongoose.model("payments", PaymentSchema);