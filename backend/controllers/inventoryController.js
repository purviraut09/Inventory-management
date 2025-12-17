const Batch = require('../models/Batch');
const Transfer = require('../models/Transfer');

// @desc    Get inventory for distributor/retailer
// @route   GET /api/inventory
// @access  Private
const getInventory = async (req, res) => {
  try {
    let inventory = [];

    if (req.user.role === 'distributor') {
      // Get batches transferred to this distributor
      const transfers = await Transfer.find({
        to: req.user._id,
        status: 'approved',
      }).populate('batch');

      inventory = transfers.map((transfer) => transfer.batch);
    } else if (req.user.role === 'retailer') {
      // Get batches transferred to this retailer
      const transfers = await Transfer.find({
        to: req.user._id,
        status: 'approved',
      }).populate('batch');

      inventory = transfers.map((transfer) => transfer.batch);
    }

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get inventory details with quantities
// @route   GET /api/inventory/details
// @access  Private
const getInventoryDetails = async (req, res) => {
  try {
    let inventoryDetails = [];

    if (req.user.role === 'distributor') {
      const transfers = await Transfer.find({
        to: req.user._id,
        status: 'approved',
      }).populate('batch');

      inventoryDetails = transfers.map((transfer) => ({
        batch: transfer.batch,
        quantity: transfer.quantity,
      }));
    } else if (req.user.role === 'retailer') {
      const transfers = await Transfer.find({
        to: req.user._id,
        status: 'approved',
      }).populate('batch');

      inventoryDetails = transfers.map((transfer) => ({
        batch: transfer.batch,
        quantity: transfer.quantity,
      }));
    }

    res.json(inventoryDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInventory,
  getInventoryDetails,
};
