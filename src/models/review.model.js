const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tours",
            required: true
        },
        star: {
            type: Number,
            min: 0,
            max: 5
        },
        comment: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("reviews", ReviewSchema);