const express = require('express');
const TourController = require("../controllers/tourController");
const Middleware = require('../config/middleware');
const router = express.Router();

router.get('/', TourController.getAllTours);
router.get('/:id', TourController.findTourById);
router.get('/find/:title', TourController.findTourByTitle);
router.post('/', TourController.createTour);
router.put('/:id', TourController.updateTour);
router.delete("/:id", TourController.deleteTour);

module.exports = router;