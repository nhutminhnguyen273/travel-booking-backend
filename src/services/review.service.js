const Review = require("../models/review.model");

class ReviewService {
    async create(userId, tourId, review) {
        try {
            const newReview = new Review({
                user: userId,
                tour: tourId,
                star: review.star,
                comment: review.comment
            });
            return await newReview.save();
        } catch (error) {
            console.error(`Lỗi đánh giá tour: ${error.message}`);
            throw error;
        }
    }

    async update(id, userId, input) {
        try {
            const review = await Review.findById(id);
            if (!review) throw new Error("Không tìm thấy đánh giá.");
            if (review.user.toString() !== userId) throw new Error("Bạn không có quyền chỉnh sữa đánh giá này.");
            return await Review.findByIdAndUpdate(id, {star: input.star, comment: input.comment}, { new: true })
        } catch (error) {
            console.error(`Lỗi khi cập nhật đánh giá: ${error.message}`);
            throw error;
        }
    }

    async delete(id, userId) {
        try {
            const review = await Review.findById(id);
            if (!review) throw new Error("Không tìm thấy đánh giá");
            if (review.user.toString() !== userId) throw new Error("Bạn không có quyền xóa đánh giá này.");
            return await Review.findByIdAndDelete({ _id: id, user: userId });
        } catch (error) {
            console.error(`Lỗi khi xóa đánh giá: ${error.message}`);
            throw error;
        }
    }

    async getList(tourId) {
        try {
            return await Review.find({ tour: tourId })
                .populate("users", "name avatar")
                .sort({ createAt: -1 });
        } catch (error) {
            console.error(`Lỗi khi lấy danh sách đánh giá: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new ReviewService();