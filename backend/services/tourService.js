const TourRepository = require('../repositories/tourRepository');

class TourService {
    async getListTours() {
        try {
            return await TourRepository.getListTours();
        } catch (error) {
            throw error;
        }
    }

    async getListDomesticTours() {
        try {
            return await TourRepository.getListDomesticTours();
        } catch (error) {
            throw error;
        }
    }

    async getListInternationalTours() {
        try {
            return await TourRepository.getListInternationalTours();
        } catch (error) {
            throw error;
        }
    }

    async findTourById(id) {
        try {
            return await TourRepository.findTourById(id);
        } catch (error) {
            throw error;
        }
    }

    async createTour(tour) {
        try {
            const existingTitle = await TourRepository.findTourByTitle(tour.title);
            if (existingTitle) throw new Error("Title already exists");
            return await TourRepository.createTour(tour);
        } catch (error) {
            throw error;
        }
    }

    async updateTour(id, tour) {
        try {
            const checkTour = await TourRepository.findTourById(id);
            if (!checkTour) throw new Error("Tour not found");
            const existingTitle = await TourRepository.findTourByTitle(tour.title);
            if (checkTour.title != tour.title && existingTitle) throw new Error("Title already exists");
            return await TourRepository.updateTour(id, tour);
        } catch (error) {
            throw error;
        }
    }

    async deleteTour(id) {
        try {
            const checkTour = await TourRepository.findTourById(id);
            if (!checkTour) throw new Error("Tour not found");
            return await TourRepository.deleteTour(id);
        } catch (error) {
            throw error;
        }
    }

    async restoreTour(id) {
        try {
            const checkTour = await TourRepository.findTourById(id);
            if (!checkTour) throw new Error("Tour not found");
            return await TourRepository.restoreTour(id);
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new TourService();