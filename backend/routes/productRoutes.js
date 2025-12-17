const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, manufacturerOnly } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// @route   GET /api/products
router.get('/', getProducts);

// @route   POST /api/products
router.post('/', manufacturerOnly, createProduct);

// @route   PUT /api/products/:id
router.put('/:id', manufacturerOnly, updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', manufacturerOnly, deleteProduct);

module.exports = router;
