const express = require("express");
const router = express.Router();
const FavoritesController = require("../controllers/favoritesController");
const Middleware = require('../middleware/middleware');

router.post("/", Middleware.verifyToken, FavoritesController.addFavorite);
router.get("/", Middleware.verifyToken, FavoritesController.getUserFavorites);
router.delete("/:favoriteId", Middleware.verifyToken, FavoritesController.removeFavorite);

module.exports = router;