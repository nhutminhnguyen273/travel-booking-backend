const TourModel = require('../models/tourModel');

class TourRepository {
    async getAllTours() {
        return await TourModel.find();
    }

    async findTourById(id) {
        return await TourModel.findById(id);
    }

    async findTourByTitle(title) {
        return await TourModel.findOne({ title });
    }

    async createTour(tour) {
        const newTour = new TourModel(tour);
        return await newTour.save();
    }

    async updateTour(id, tour) {
        return await TourModel.findByIdAndUpdate(id, tour, { new: true });
    }

    async deleteTour(id) {
        return await TourModel.findByIdAndDelete(id);
    }
}
module.exports = new TourRepository;