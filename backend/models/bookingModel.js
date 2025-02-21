const mongoose = require('mongoose');
const BookingStatusEnum = require('../enums/bookingStatusEnum');
const PaymentStatusEnum = require('../enums/paymentStatusEnum');

const BookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        tourId: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        numberOfGuests: {
            type: Number
        },
        totalPrice: {
            type: Number
        },
        status: {
            type: String,
            enum: Object.values(BookingStatusEnum),
            default: BookingStatusEnum.FAILED
        },
        bookingDate: {
            type: Date,
            default: Date.now()
        },
        paymentStatus: {
            type: String,
            enum: Object.values(PaymentStatusEnum),
            default: PaymentStatusEnum.FAILED
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Booking", BookingSchema);