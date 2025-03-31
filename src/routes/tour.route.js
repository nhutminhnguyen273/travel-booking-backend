const router = require("express").Router();
const TourController = require("../controllers/tour.controller");
const Middlware = require("../middleware/middleware");

router.get("/", TourController.getListTours);
router.get("/:id", TourController.getTourById);
router.get("/type/:type", TourController.getListToursByType);

// Admin
router.post("/", Middlware.verifyTokenAdmin, TourController.createTour);
router.put("/:id", Middlware.verifyTokenAdmin, TourController.updateTour);
router.delete("/:id", Middlware.verifyTokenAdmin, TourController.deleteTour);
router.put("/restore/:id", Middlware.verifyTokenAdmin, TourController.restoreTour);

module.exports = router;