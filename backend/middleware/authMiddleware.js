const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Check if user is manufacturer
const manufacturerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'manufacturer') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Manufacturer only.' });
  }
};

// Check if user is distributor
const distributorOnly = (req, res, next) => {
  if (req.user && req.user.role === 'distributor') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Distributor only.' });
  }
};

// Check if user is retailer
const retailerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'retailer') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Retailer only.' });
  }
};

module.exports = {
  protect,
  manufacturerOnly,
  distributorOnly,
  retailerOnly,
};
