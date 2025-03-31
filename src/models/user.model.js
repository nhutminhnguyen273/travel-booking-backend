const mongoose = require("mongoose");
const Gender = require("../enums/gender.enum");
const Role = require("../enums/role.enum");
const Permission = require("../enums/permission.enum");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trip: true
        },
        fullName: {
            type: String,
            required: true,
            trip: true
        },
        dateOfBirth: {
            type: String,
            required: true,
            trip: true
        },
        gender: {
            type: String,
            enum: Object.values(Gender),
            default: Gender.Male
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trip: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trip: true
        },
        status: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(Role),
            default: Role.Customer
        },
        permission: {
            type: [String],
            enum: Object.values(Permission),
        },
        password: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);