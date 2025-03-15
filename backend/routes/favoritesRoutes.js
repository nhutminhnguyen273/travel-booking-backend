const express = require("express");
const router = express.Router();
const FavoritesController = require("../controllers/favoritesController");
const Middleware = require('../middleware/middleware');

// Tất cả routes yêu cầu authentication
router.use(Middleware.verifyToken);

router.post("/", FavoritesController.addFavorite);
router.get("/", FavoritesController.getUserFavorites);
router.delete("/:favoriteId", FavoritesController.removeFavorite);

module.exports = router;