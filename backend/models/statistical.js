const mongoose = require('mongoose');

const StatisticalSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        totalBookings: {
            type: Number,
            default: 0
        },
        totalRevenue: {
            type: Number,
            default: 0
        },
        totalUsers: {
            type: Number,
            default: 0
        },
        totalTours: {
            type: Number,
            default: 0
        },
        paymentMethods: {
            VNPay: {
                type: Number,
                default: 0
            },
            MoMo: {
                type: Number,
                default: 0
            }
        },
        bookingStatus: {
            pending: {
                type: Number,
                default: 0
            },
            confirmed: {
                type: Number,
                default: 0
            },
            cancelled: {
                type: Number,
                default: 0
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
                    default: 0
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
    { timestamps: true }
);

module.exports = mongoose.model("statistical", StatisticalSchema);