const mongoose = require("mongoose");
const PaymentStatus = require("../enums/payment-status.enum");
const PaymentMethod = require("../enums/payment-method.enum");
const BookingStatus = require("../enums/booking-status");

const BookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tours",
            required: true
        },
        schedules: [
            {
                startDate: {
                    type: Date,
                    required: true
                },
                endDate: {
                    type: Date,
                    required: true
                }
            }
        ],
        peopleCount: {
            type: Number,
            required: true,
            min: 1
        },
        paymentStatus: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.Pending
        },
        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethod),
            required: true,
            default: PaymentMethod.STRIPE
        },
        status: {
            type: String,
            enum: Object.values(BookingStatus),
            default: BookingStatus.Pending
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        },
        totalAmount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("booking", BookingSchema);