// File: src/middleware/validators.js
const { check, validationResult } = require('express-validator');

exports.validateVoucher = [
  check('recipient').isString().notEmpty(),
  check('expirationDate').isISO8601(),
  check('discountAmount').isNumeric(),
  check('voucherType').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateRegistration = [
  check('name').isString().notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateLogin = [
  check('email').isEmail(),
  check('password').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
