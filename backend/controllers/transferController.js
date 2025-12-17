const Transfer = require('../models/Transfer');
const Batch = require('../models/Batch');
const User = require('../models/User');

// @desc    Get all transfers
// @route   GET /api/transfers
// @access  Private
const getTransfers = async (req, res) => {
  try {
    let transfers;

    if (req.user.role === 'manufacturer') {
      transfers = await Transfer.find({ from: req.user._id }).populate('batch to');
    } else if (req.user.role === 'distributor') {
      transfers = await Transfer.find({
        $or: [{ from: req.user._id }, { to: req.user._id }],
      }).populate('batch from to');
    } else if (req.user.role === 'retailer') {
      transfers = await Transfer.find({ to: req.user._id }).populate('batch from');
    }

    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a transfer
// @route   POST /api/transfers
// @access  Private
const createTransfer = async (req, res) => {
  const { batch, to, quantity } = req.body;

  try {
    const batchExists = await Batch.findById(batch);
    const toUser = await User.findById(to);

    if (!batchExists) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    if (!toUser) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Check role hierarchy
    if (req.user.role === 'manufacturer' && toUser.role !== 'distributor') {
      return res.status(400).json({ message: 'Manufacturers can only transfer to distributors' });
    }

    if (req.user.role === 'distributor' && toUser.role !== 'retailer') {
      return res.status(400).json({ message: 'Distributors can only transfer to retailers' });
    }

    if (req.user.role === 'retailer') {
      return res.status(400).json({ message: 'Retailers cannot initiate transfers' });
    }

    const transfer = await Transfer.create({
      batch,
      from: req.user._id,
      to,
      quantity,
    });

    res.status(201).json(transfer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update transfer status
// @route   PUT /api/transfers/:id
// @access  Private
const updateTransfer = async (req, res) => {
  const { status } = req.body;

  try {
    const transfer = await Transfer.findById(req.params.id);

    if (!transfer) {
      return res.status(404).json({ message: 'Transfer not found' });
    }

    // Only recipient can update status
    if (transfer.to.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    transfer.status = status;
    await transfer.save();

    res.json(transfer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a transfer
// @route   DELETE /api/transfers/:id
// @access  Private
const deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);

    if (!transfer) {
      return res.status(404).json({ message: 'Transfer not found' });
    }

    // Only sender can delete pending transfers
    if (transfer.from.toString() !== req.user._id.toString() || transfer.status !== 'pending') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await transfer.remove();
    res.json({ message: 'Transfer removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer,
};
