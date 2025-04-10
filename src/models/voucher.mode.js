const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
    {
        code: {
            type: String,
        },
        discountType: {
            type: String,
            enum: ["percentage", "fixed"],
        },
        discountValue: {
            type: Number,
        },
        minOrderValue: {
            type: Number,
        },
        maxDiscount: {
            type: Number,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        usageLimit: {
            type: Number,
        },
        usedCount: {
            type: Number,
        },
        isActive: {
            type: Boolean,
        },
        applicableTours: {
            type: [String],
        },
        isDeleted: {
            type: Boolean,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("vouchers", VoucherSchema);