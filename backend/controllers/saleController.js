const Sale = require('../models/Sale');
const Batch = require('../models/Batch');

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private (Retailer only)
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find({ retailer: req.user._id }).populate('batch');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a sale
// @route   POST /api/sales
// @access  Private (Retailer only)
const createSale = async (req, res) => {
  const { batch, quantity, price, customerName, customerContact } = req.body;

  try {
    const batchExists = await Batch.findById(batch);

    if (!batchExists) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Check if retailer has this batch in inventory
    // This would require checking transfers, but for simplicity, assume it's available

    const sale = await Sale.create({
      batch,
      retailer: req.user._id,
      quantity,
      price,
      customerName,
      customerContact,
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get sales report
// @route   GET /api/sales/report
// @access  Private (Retailer only)
const getSalesReport = async (req, res) => {
  try {
    const sales = await Sale.find({ retailer: req.user._id }).populate('batch');

    const report = sales.reduce((acc, sale) => {
      const total = sale.quantity * sale.price;
      acc.totalSales += total;
      acc.totalItems += sale.quantity;
      return acc;
    }, { totalSales: 0, totalItems: 0 });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSales,
  createSale,
  getSalesReport,
};
