const express = require('express');
const router = express.Router();
const {
  getTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer,
} = require('../controllers/transferController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/transfers
router.get('/', getTransfers);

// @route   POST /api/transfers
router.post('/', createTransfer);

// @route   PUT /api/transfers/:id
router.put('/:id', updateTransfer);

// @route   DELETE /api/transfers/:id
router.delete('/:id', deleteTransfer);

module.exports = router;
