const mongoose = require('mongoose');
const RoleEnum = require('../enums/roleEnum');
const GenderEnum = require('../enums/genderEnum');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
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
            enum: Object.values(GenderEnum),
            default: GenderEnum.MALE
        },
        email: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: Object.values(RoleEnum),
            default: RoleEnum.CUSTOMER
        }
    }
);
module.exports = mongoose.model('Users', UserSchema);