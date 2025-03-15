const express = require('express');
const Middleware = require('../middleware/middleware');
const TourController = require('../controllers/tourController');

const router = express.Router();

// Public routes (không cần authentication)
router.get('/', TourController.getListTours);
router.get('/domestic', TourController.getListDomesticTours);
router.get('/international', TourController.getListInternationalTours);
router.get('/:id', TourController.findTourById);

// Admin only routes
router.post('/', Middleware.verifyTokenAdmin, TourController.createTour);
router.put('/:id', Middleware.verifyTokenAdmin, TourController.updateTour);
router.put('/delete/:id', Middleware.verifyTokenAdmin, TourController.deleteUser);
router.put('/restore/:id', Middleware.verifyTokenAdmin, TourController.restoreUser);

module.exports = router;