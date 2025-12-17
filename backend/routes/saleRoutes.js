const express = require('express');
const router = express.Router();
const {
  getSales,
  createSale,
  getSalesReport,
} = require('../controllers/saleController');
const { protect, retailerOnly } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/sales
router.get('/', getSales);

// @route   POST /api/sales
router.post('/', retailerOnly, createSale);

// @route   GET /api/sales/report
router.get('/report', retailerOnly, getSalesReport);

module.exports = router;
