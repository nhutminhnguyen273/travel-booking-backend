const router = require("express").Router();
const Middleware = require("../middleware/middleware");
const FavoritesController = require("../controllers/favorites.controller");

router.post("/", Middleware.verifyToken, FavoritesController.addFavorite);
router.get("/", Middleware.verifyToken, FavoritesController.getFavorites);
router.delete("/:id", Middleware.verifyToken, FavoritesController.removeFavorite);

module.exports = router;