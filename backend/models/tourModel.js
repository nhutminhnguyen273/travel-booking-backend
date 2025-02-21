const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        destinations: {
            type: [String]
        },
        images: {
            type: [String]
        },
        numberOfDays: {
            type: Number
        },
        schedule: {
            type: [String]
        },
        numberOfGuests: {
            type: Number
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Tours", TourSchema);