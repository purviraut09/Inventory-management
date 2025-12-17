const Batch = require('../models/Batch');
const Product = require('../models/Product');

// @desc    Get all batches
// @route   GET /api/batches
// @access  Private
const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find({ manufacturer: req.user._id }).populate('product');
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a batch
// @route   POST /api/batches
// @access  Private (Manufacturer only)
const createBatch = async (req, res) => {
  const { product, batchNumber, quantity, manufacturingDate, expiryDate } = req.body;

  try {
    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (productExists.manufacturer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const batch = await Batch.create({
      product,
      batchNumber,
      quantity,
      manufacturingDate,
      expiryDate,
      manufacturer: req.user._id,
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a batch
// @route   PUT /api/batches/:id
// @access  Private (Manufacturer only)
const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    if (batch.manufacturer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a batch
// @route   DELETE /api/batches/:id
// @access  Private (Manufacturer only)
const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    if (batch.manufacturer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await batch.remove();
    res.json({ message: 'Batch removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
};
