const mongoose = require("mongoose");
const PaymentStatus = require("../enums/payment-status.enum");
const PaymentMethod = require("../enums/payment-method.enum");

const HistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bookings",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethod),
            required: true
        },
        status: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.Pending
        },
        transactionId: {
            type: String,
            unique: true
        },
        paymentDate: {
            type: Date
        },
        description: {
            type: String
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed
        }
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("histories", HistorySchema);
