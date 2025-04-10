const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, "Vui lòng nhập mã voucher"],
            unique: true,
            trim: true,
        },
        discountType: {
            type: String,
            required: [true, "Vui lòng chọn loại giảm giá"],
            enum: ["percentage", "fixed"],
        },
        discountValue: {
            type: Number,
            required: [true, "Vui lòng nhập giá trị giảm giá"],
            min: [0, "Giá trị giảm giá không được âm"],
        },
        minOrderValue: {
            type: Number,
            required: [true, "Vui lòng nhập giá trị đơn hàng tối thiểu"],
            min: [0, "Giá trị đơn hàng tối thiểu không được âm"],
        },
        maxDiscount: {
            type: Number,
            required: [true, "Vui lòng nhập giảm giá tối đa"],
            min: [0, "Giảm giá tối đa không được âm"],
        },
        startDate: {
            type: Date,
            required: [true, "Vui lòng nhập ngày bắt đầu"],
        },
        endDate: {
            type: Date,
            required: [true, "Vui lòng nhập ngày kết thúc"],
        },
        usageLimit: {
            type: Number,
            required: [true, "Vui lòng nhập số lần sử dụng tối đa"],
            min: [1, "Số lần sử dụng tối thiểu là 1"],
        },
        usedCount: {
            type: Number,
            default: 0,
            min: [0, "Số lần đã sử dụng không được âm"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        applicableTours: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "tours",
        }],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Kiểm tra voucher có hợp lệ không
voucherSchema.methods.isValid = function() {
    const now = new Date();
    return (
        this.isActive &&
        !this.isDeleted &&
        now >= this.startDate &&
        now <= this.endDate &&
        this.usedCount < this.usageLimit
    );
};

// Tính giá trị giảm giá
voucherSchema.methods.calculateDiscount = function(orderAmount) {
    if (orderAmount < this.minOrderValue) {
        return 0;
    }

    let discount = 0;
    if (this.discountType === "percentage") {
        discount = (orderAmount * this.discountValue) / 100;
        if (discount > this.maxDiscount) {
            discount = this.maxDiscount;
        }
    } else {
        discount = this.discountValue;
    }

    return discount;
};

module.exports = mongoose.model("Voucher", voucherSchema); 