const Tour = require('../models/tour');
const tourType = require('../enums/tourType');

class TourRepository {
    async getListTours() {
        try {
            return await Tour.find({ isDeleted: false });
        } catch (error) {
            throw error;
        }
    }

    async getListDomesticTours() {
        try {
            return await Tour.find({ type: tourType.DOMESTIC, isDeleted: false });
        } catch (error) {
            throw error;
        }
    }

    async getListInternationalTours() {
        try {
            return await Tour.find({ type: tourType.INTERNATIONAL, isDeleted: false });
        } catch (error) {
            throw error;
        }
    }

    async findTourById(id) {
        try {
            return await Tour.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findTourByTitle(title) {
        try {
            return await Tour.findOne({ title });
        } catch (error) {
            throw error;
        }
    }

    async createTour(tour) {
        try {
            return await Tour.create(tour);
        } catch (error) {
            throw error;
        }
    }

    async updateTour(id, tour) {
        try {
            return await Tour.findByIdAndUpdate(id, tour, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async deleteTour(id) {
        try {
            return await Tour.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async restoreTour(id) {
        try {
            return await Tour.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TourRepository();