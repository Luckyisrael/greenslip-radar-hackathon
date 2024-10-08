// File: src/models/Voucher.js
const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  signature: { type: String, required: true, unique: true },
  recipient: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  discountAmount: { type: Number, required: true },
  voucherType: { type: String, required: true },
  isRedeemed: { type: Boolean, default: false },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);

