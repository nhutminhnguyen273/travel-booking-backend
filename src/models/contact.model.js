const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Vui lòng nhập tên"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Vui lòng nhập email"],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email không hợp lệ"],
        },
        phone: {
            type: String,
            required: [true, "Vui lòng nhập số điện thoại"],
            trim: true,
        },
        subject: {
            type: String,
            required: [true, "Vui lòng nhập tiêu đề"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Vui lòng nhập nội dung"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "processing", "completed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema); 