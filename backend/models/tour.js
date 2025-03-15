const mongoose = require('mongoose');
const tourType = require('../enums/tourType');
const statusTour = require('../enums/statusTour');

const TourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        destination: {
            type: [String],
            required: true
        },
        type: {
            type: String,
            enum: Object.values(tourType),
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        startDays: {
            type: [Number],
            required: true
        },
        maxPeople: {
            type: Number,
            required: true
        },
        image: {
            type: [String],
            required: true
        },
        itinerary: [
            {
                day: Number,
                title: String,
                description: String
            }
        ],
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "users"
                },
                rating: {
                    type: Number,
                    min: 0,
                    max: 5,
                },
                comment: String
            }
        ],
        status: {
            type: String,
            enum: Object.values(statusTour),
            default: statusTour.AVAILABLE
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        remainingSeats: {
            type: Number,
            required: [true, 'Tour phải có số chỗ'],
            min: [0, 'Số chỗ không thể âm']
        }
    },
    {timestamps: true}
);
module.exports = mongoose.model("tours", TourSchema);