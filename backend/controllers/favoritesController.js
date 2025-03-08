const favoritesService = require("../services/favoritesService");

class FavoritesController {
    async addFavorite(req, res) {
        try {
            const userId = req.user.id; // Lấy userId từ JWT token
            const { tourId } = req.body;

            const favorite = await favoritesService.addFavorite(userId, tourId);
            res.status(201).json({ message: "Đã thêm vào danh sách yêu thích", data: favorite });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserFavorites(req, res) {
        try {
            const userId = req.user.id; // Lấy userId từ JWT token
            const favorites = await favoritesService.getUserFavorites(userId);
            res.json(favorites);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeFavorite(req, res) {
        try {
            const userId = req.user.id; // Lấy userId từ JWT token
            const { favoriteId } = req.params;

            await favoritesService.removeFavorite(favoriteId, userId);
            res.json({ message: "Đã xóa khỏi danh sách yêu thích" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new FavoritesController();