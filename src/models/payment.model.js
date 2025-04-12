const mongoose = require("mongoose");
const Currency = require("../enums/currency.enum");
const PaymentMethod = require("../enums/payment-method.enum");
const PaymentStatus = require("../enums/payment-status.enum");

const PaymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "Vui lòng cung cấp thông tin người dùng"],
        },
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bookings",
            required: [true, "Vui lòng cung cấp thông tin đặt tour"],
        },
        amount: {
            type: Number,
            required: [true, "Vui lòng nhập số tiền"],
            min: [0, "Số tiền không được âm"],
        },
        method: {
            type: String,
            required: [true, "Vui lòng chọn phương thức thanh toán"],
            enum: Object.values(PaymentMethod),
        },
        status: {
            type: String,
            required: [true, "Vui lòng cung cấp trạng thái thanh toán"],
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        transactionId: {
            type: String,
            required: [true, "Vui lòng cung cấp mã giao dịch"],
            unique: true,
        },
        paymentDetails: {
            type: Map,
            of: String,
        },
        refundDetails: {
            refundId: String,
            refundAmount: Number,
            refundReason: String,
            refundedAt: Date,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Kiểm tra payment có thể hoàn tiền không
PaymentSchema.methods.canRefund = function() {
    return this.status === "completed";
};

// Lấy thông tin hoàn tiền
PaymentSchema.methods.getRefundDetails = function() {
    return this.refundDetails;
};

module.exports = mongoose.model("Payment", PaymentSchema);