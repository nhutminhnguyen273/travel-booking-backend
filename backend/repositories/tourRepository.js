const Tour = require('../models/tour');
const tourType = require('../enums/tourType');

class TourRepository {
    async getListTours() {
        try {
            return await Tour.find({ isDeleted: false });
        } catch (error) {
            console.error(`❌ Error fetching tours: ${error.message}`);
            throw error;
        }
    }

    async getListDomesticTours() {
        try {
            return await Tour.find({ type: tourType.DOMESTIC, isDeleted: false });
        } catch (error) {
            console.error(`❌ Error fetching tours: ${error.message}`);
            throw error;
        }
    }

    async getListInternationalTours() {
        try {
            return await Tour.find({ type: tourType.INTERNATIONAL, isDeleted: false });
        } catch (error) {
            console.error(`❌ Error fetching tours: ${error.message}`);
            throw error;
        }
    }

    async findTourById(id) {
        try {
            return await Tour.findById(id);
        } catch (error) {
            console.error(`❌ Error finding tour by ID: ${error.message}`);
            throw error;
        }
    }

    async findTourByTitle(title) {
        try {
            return await Tour.findOne({ title });
        } catch (error) {
            console.error(`❌ Error finding tour by ID: ${error.message}`);
            throw error;
        }
    }

    async createTour(tour) {
        try {
            return await Tour.create(tour);
        } catch (error) {
            console.error(`❌ Error creating tour: ${error.message}`);
            throw error;
        }
    }

    async updateTour(id, tour) {
        try {
            return await Tour.findByIdAndUpdate(id, tour, { new: true });
        } catch (error) {
            console.error(`❌ Error updating tour: ${error.message}`);
            throw error;
        }
    }

    async deleteTour(id) {
        try {
            return await Tour.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        } catch (error) {
            console.error(`❌ Error deleting tour: ${error.message}`);
            throw error;
        }
    }

    async restoreTour(id) {
        try {
            return await Tour.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        } catch (error) {
            console.log(`❌ Error restoring tour: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new TourRepository();