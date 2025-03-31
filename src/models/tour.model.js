const mongoose = require("mongoose");
const TourType = require("../enums/tour-types.enum");
const StatusTour = require("../enums/status-tour.enum");

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
            enum: Object.values(TourType),
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        schedules: [
            {
                startDate: {
                    type: Date,
                    required: true
                },
                endDate: {
                    type: Date,
                    required: true
                }
            }
        ],
        maxPeople: {
            type: Number,
            required: true
        },
        remainingSeats: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: function (value) {
                    return value <= this.maxPeople;
                },
                message: "Ghế còn lại không được quá số lượng người tối đa."
            }
        },
        images: {
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
        status: {
            type: String,
            enum: Object.values(StatusTour),
            default: StatusTour.Available
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("tours", TourSchema);