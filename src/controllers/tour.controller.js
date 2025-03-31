const TourService = require("../services/tour.service");

class TourController {
    async getListTours(req, res) {
        try {
            const tours = await TourService.getList();
            res.status(200).json({
                message: "Lấy danh sách tours thành công.",
                data: tours
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getListToursByType(req, res) {
        try {
            const { type } = req.params;
            const tours = await TourService.getListByTypes(type);
            res.status(200).json({
                message: "Lấy danh sách tour thành công",
                data: tours
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getTourById(req, res) {
        try {
            const tour = await TourService.getById(req.params.id);
            res.status(200).json({
                message: "Lấy thông tin tour thành công.",
                data: tour
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async createTour(req, res) {
        try {
            const tour = await TourService.create(req.body);
            res.status(200).json({
                message: "Thêm tour thành công.",
                data: tour
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async updateTour(req, res) {
        try {
            const tour = await TourService.update(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật tour thành công.",
                data: tour
            });
        } catch (error) {
            res.status()
        }
    }

    async deleteTour(req, res) {
        try {
            await TourService.delete(req.params.id);
            res.status(200).json({
                message: "Xóa tour thành công"
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async restoreTour(req, res) {
        try {
            await TourService.restore(req.params.id);
            res.status(200).json({
                message: "Khôi phục tour thành công",
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new TourController();