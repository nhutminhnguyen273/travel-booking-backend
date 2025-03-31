const ReviewService = require("../services/review.service");

class ReviewController {
    async getListReviews(req, res) {
        try {
            const { tourId } = req.params;
            const reviews = await ReviewService.getList(tourId);
            res.status(200).json({
                message: "Lấy danh sách đánh giá thành công",
                data: reviews
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async createReview(req, res) {
        try {
            const userId = req.user.id;
            const tourId = req.params.id;
            const review = await ReviewService.create(userId, tourId, req.body);
            res.status(200).json({
                message: "Đánh giá thành công!",
                data: review
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async updateReview(req, res) {
        try {
            const userId = req.user.id;
            const review = await ReviewService.update(req.body.id, userId, req.body);
            res.status(200).json({
                message: "Cập nhật đánh giá thành công!",
                data: review
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async deleteReview(req, res) {
        try {
            await ReviewService.delete(req.body.id);
            res.status(200).json({
                message: "Xóa đánh giá thành công",
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new ReviewController();