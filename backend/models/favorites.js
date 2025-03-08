const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
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
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("favorites", FavoriteSchema);