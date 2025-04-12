const mongoose = require("mongoose");

const StatisticalSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        totalBookings: {
            type: Number,
            min: 0
        },
        totalRevenue: {
            type: Number,
            min: 0,
        },
        confirmedRevenue: {
            type: Number,
            min: 0,
        },
        totalUsers: {
            type: Number,
            min: 0,
        },
        totalTours: {
            type: Number,
            default: 0,
        },
        paymentMethods: {
            VNPay: {
                type: Number,
                min: 0,
            },
            MoMo: {
                type: Number,
                min: 0,
            },
            Stripe: {
                type: Number,
                min: 0,
            }
        },
        bookingStatus: {
            pending: {
                type: Number,
                min: 0,
            },
            confirmed: {
                type: Number,
                min: 0,
            },
            cancelled: {
                type: Number,
                min: 0,
            }
        },
        revenueByTour: [
            {
                tour: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "tours"
                },
                revenue: {
                    type: Number,
                    min: 0,
                }
            }
        ],
        monthlyRevenue: [
            {
                month: Number,
                year: Number,
                revenue: Number
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model("statistical", StatisticalSchema);