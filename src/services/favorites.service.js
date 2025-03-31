const Favorites = require("../models/favorites.model");

class FavoritesService {
    async add(userId, tourId) {
        try {
            const tour = await Favorites.exists({ user: userId, tour: tourId });
            if (tour) throw new Error("Tour này đã có trong danh sách yêu thích của bạn");
            const newFavorites = new Favorites({
                user: userId,
                tour: tourId
            });
            return await newFavorites.save();
        } catch (error) {
            console.error(`❌ Lỗi khi thêm vào danh sách yêu thích: ${error.message}`);
            throw error;
        }
    }

    async getList(userId) {
        try {
            return await Favorites.find({ user: userId }).populate("tours");
        } catch (error) {
            console.error(`❌ Lỗi không thể lấy danh sách yêu thích: ${error.message}`);
            throw error;
        }
    }

    async remove(favoriteId, userId) {
        try {
            return await Favorites.findByIdAndDelete({ _id: favoriteId, user: userId });
        } catch (error) {
            console.error(`❌ Lỗi khi xóa tour khỏi danh sách yêu thích: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new FavoritesService();