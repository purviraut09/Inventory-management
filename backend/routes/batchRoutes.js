const express = require('express');
const router = express.Router();
const {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
} = require('../controllers/batchController');
const { protect, manufacturerOnly } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/batches
router.get('/', getBatches);

// @route   POST /api/batches
router.post('/', manufacturerOnly, createBatch);

// @route   PUT /api/batches/:id
router.put('/:id', manufacturerOnly, updateBatch);

// @route   DELETE /api/batches/:id
router.delete('/:id', manufacturerOnly, deleteBatch);

module.exports = router;
