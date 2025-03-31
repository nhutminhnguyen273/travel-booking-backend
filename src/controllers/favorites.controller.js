const FavoritesService = require("../services/favorites.service");

class FavoritesController {
    async addFavorite(req, res) {
        try {
            const userId = req.user.id;
            const {tourId} = req.body;
            const favorite = await FavoritesService.addFavorite(userId, tourId);
            res.status(200).json({
                message: "Thêm vào danh sách yêu thích thành công!",
                data: favorite
            });
        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getFavorites(req, res) {
        try {
            const userId = req.user.id;
            const favorites = await FavoritesService.getList(userId);
            res.status(200).json({
                message: "Lấy danh sách yêu thích thành công",
                data: favorites
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async removeFavorite(req, res) {
        try {

        } catch (error) {
            res.status(400).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new FavoritesController();