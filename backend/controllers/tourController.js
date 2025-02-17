const TourService = require('../services/tourService');

class TourController {
    async getAllTours(req, res) {
        try {
            const tours = await TourService.getAllTours();
            res.status(200).json({
                message: "Thành công",
                data: tours
            });
        }catch(err) {
            res.json({
                message: "Lỗi khi lấy danh sách Tours",
                error: err.message
            });
        }
    }

    async findTourById(req, res) {
        try {
            const tour = await TourService.findTourById(req.params.id);
            res.status(200).json({
                message: "Tìm Tour thành công",
                data: tour
            });
        }catch(err) {
            res.json({
                message: "Lỗi khi tìm tour",
                error: err.message
            });
        }
    } 

    async findTourByTitle(req, res) {
        try {
            const tour = await TourService.findTourByTitle(req.params.title);
            res.status(200).json({
                message: "Tìm Tour thành công",
                data: tour
            });
        }catch(err) {
            res.json({
                message: "Lỗi khi tìm tour",
                error: err.message
            });
        }
    }

    async createTour(req, res) {
        try {
            const tour = await TourService.createTour(req.body);
            res.status(200).json({
                message: "Thêm tour thành công",
                data: tour
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi tạo tour",
                error: err.message
            });
        }
    }

    async updateTour(req, res) {
        try {
            const tour = await TourService.updateTour(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật tour thành công",
                data: tour
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi cập nhật tour",
                error: err.message
            });
        }
    }

    async deleteTour(req, res) {
        try {
            await TourService.deleteTour(req.params.id);
            res.status(200).json({
                message: "Xóa tour thành công"
            });
        }catch(err) {
            res.status(500).json({
                message: "Lỗi khi xóa tour",
                error: err.message
            });
        }
    }
}
module.exports = new TourController;