const favoritesRepository = require('../repositories/favoritesRepository');

class FavoritesService {
    async addFavorite(userId, tourId, note) {
        try {
            const exists = await favoritesRepository.isFavoriteExists(userId, tourId);
            if (exists) {
                throw new Error("Tour này đã có trong danh sách yêu thích");
            }
            return await favoritesRepository.addFavorite(userId, tourId, note);
        } catch (error) {
            console.error(`❌ Error adding favorite: ${error.message}`);
            throw error;
        }
    }

    async getUserFavorites(userId) {
        try {
            return await favoritesRepository.getUserFavorites(userId);
        } catch (error) {
            console.error(`❌ Error getting favorites: ${error.message}`);
            throw error;
        }
    }

    async removeFavorite(favoriteId, userId) {
        try {
            const favorite = await favoritesRepository.removeFavorite(favoriteId, userId);
            if (!favorite) {
                throw new Error("Không tìm thấy mục yêu thích hoặc bạn không có quyền xóa");
            }
            return favorite;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new FavoritesService();