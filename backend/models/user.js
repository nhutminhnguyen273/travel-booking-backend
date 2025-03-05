const mongoose = require('mongoose');
const genderEnum = require('../enums/genderEnum');
const roleEnum = require('../enums/roleEnum');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username không được trống"],
            trim: true
        },
        fullname: {
            type: String,
            required: [true, "Full name không được trống"],
            trim: true
        },
        dob: {
            type: Date
        },
        gender: {
            type: String,
            enum: Object.values(genderEnum),
            default: genderEnum.OTHER
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Địa chỉ email không chính xác"]
        },
        phone: {
            type: String,
            unique: true,
            trim: true,
            match: [/^\d{10}$/, "Số điện thoại phải đủ 10 số"]
        },
        avatar: {
            type: String,
            default: "default-avatar.png"
        },
        password: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: Object.values(roleEnum),
            default: roleEnum.CUSTOMER
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("users", UserSchema);