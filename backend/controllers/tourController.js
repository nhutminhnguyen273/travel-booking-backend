const tourRepository = require('../repositories/tourRepository');
const TourService = require('../services/tourService');

class TourController {
    async getListTours(req, res) {
        try {
            const listTours = await TourService.getListTours();
            res.status(200).json({
                message: "List tours",
                data: listTours
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async getListDomesticTours(req, res) {
        try {
            const listTours = await TourService.getListDomesticTours();
            res.status(200).json({
                message: "List tours",
                data: listTours
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        } 
    }

    async getListInternationalTours(req, res) {
        try {
            const listTours = await TourService.getListInternationalTours();
            res.status(200).json({
                message: "List tours",
                data: listTours
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        } 
    }

    async findTourById(req, res) {
        try {
            const tour = await TourService.findTourById(req.params.id);
            res.status(200).json({
                message: "Finded tour",
                data: tour
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async createTour(req, res) {
        try {
            const newTour = await tourRepository.createTour(req.body);
            res.status(200).json({
                message: "Created tour",
                data: newTour
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async updateTour(req, res) {
        try {
            const tour = await TourService.updateTour(req.params.id, req.body);
            res.status(200).json({
                message: "Updated tour",
                data: tour
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async deleteUser(req, res) {
        try {
            await TourService.deleteTour(req.params.id);
            res.status(200).json({
                message: "Deleted successfully"
            });
        } catch (err) {
            res.status(200).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async restoreUser(req, res) {
        try {
            await TourService.restoreTour(req.params.id);
            res.status(200).json({
                message: "Restoring successfully"
            });
        } catch (err) {
            res.status(200).json({
                message: "Error",
                error: err.message
            });
        }
    }
}
module.exports = new TourController();