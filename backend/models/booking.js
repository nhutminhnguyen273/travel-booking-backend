const mongoose = require('mongoose');

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
        startDate: {
            type: Date,
            required: true
        },
        peopleCount: {
            type: Number,
            required: true,
            min: 1
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Cancelled"],
            default: "Pending"
        },
        paymentMethod: {
            type: String,
            enum: ["VNPay", "MoMo"],
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled"],
            default: "Pending"
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("booking", BookingSchema);