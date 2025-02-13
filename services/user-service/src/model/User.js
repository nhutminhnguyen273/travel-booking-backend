const mongoose = require('mongoose');
const Gender = require('../enum/gender');
const Role = require('../enum/role');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true
        },
        firstname: {
            type: String,
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        },
        dateOfBirth: {
            type: Date
        },
        gender: {
            type: String,
            enum: Object.values(Gender)
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.CUSTOMER
        }
    }
);

module.exports = mongoose.model("Users", UserSchema);