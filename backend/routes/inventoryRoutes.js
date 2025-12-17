const express = require('express');
const router = express.Router();
const {
  getInventory,
  getInventoryDetails,
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/inventory
router.get('/', getInventory);

// @route   GET /api/inventory/details
router.get('/details', getInventoryDetails);

module.exports = router;
