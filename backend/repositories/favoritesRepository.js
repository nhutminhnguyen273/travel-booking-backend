const Favorite = require('../models/favorites');

class FavoriteRepository {
    async addFavorite(userId, tourId) {
        try {
            return await Favorite.create({ user: userId, tour: tourId });
        } catch (error) {
            throw error;
        }
    }

    async getUserFavorites(userId) {
        try {
            return await Favorite.find({ user: userId }).populate("tour");
        } catch (error) {
            throw error;
        }
    }

    async removeFavorite(favoriteId, userId) {
        try {
            return await Favorite.findByIdAndDelete({ _id: favoriteId, user: userId });
        } catch (error) {
            throw error;
        }
    }

    async isFavoriteExists(userId, tourId) {
        try {
            return await Favorite.exists({ user: userId, tour: tourId });
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new FavoriteRepository();