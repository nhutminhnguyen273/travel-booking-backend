const mongoose = require('mongoose');
const PaymentMethodEnum = require('../enums/paymentMethodEnum');
const PaymentStatusEnum = require('../enums/paymentStatusEnum');

const PaymentSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethodEnum),
            default: PaymentMethodEnum.VNPAY
        },
        amount: {
            type: Number,
            required: true
        },
        transactionId: {
            type: String
        },
        paymentDate: {
            type: Date
        },
        status: {
            type: String,
            enum: Object.values(PaymentStatusEnum),
            default: PaymentStatusEnum.FAILED
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Payments", PaymentSchema);