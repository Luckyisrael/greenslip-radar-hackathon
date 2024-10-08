// File: src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { PublicKey } = require('@solana/web3.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errorTypes');

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  // In this case, we're just checking if the public key is valid
  try {
    new PublicKey(decoded.publicKey);
  } catch (error) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 4) Grant access to protected route
  req.user = decoded;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // This is a placeholder. In a real application, you'd have a way to assign and check roles.
    // For now, we'll assume all authenticated users have access.
    next();
  };
};