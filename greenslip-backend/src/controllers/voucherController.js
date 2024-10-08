// File: src/controllers/voucherController.js

const solanaService = require('../services/solanaService');
const { validateVoucherInput, validateUpdateVoucherInput } = require('../utils/voucherUtils');
const AppError = require('../utils/errorTypes');
const catchAsync = require('../utils/catchAsync');

exports.createVoucher = catchAsync(async (req, res, next) => {
  const { voucherType, expirationTime, discountValue } = req.body;

  // Validate input
  const validationError = validateVoucherInput(voucherType, expirationTime, discountValue);
  if (validationError) {
    return next(new AppError(validationError, 400));
  }

  // Assuming the user's wallet is attached to the request by middleware
  const issuerWallet = req.wallet;

  let formattedVoucherType;
  switch (voucherType) {
    case 'percentage':
      formattedVoucherType = { PercentageDiscount: { percentage: discountValue } };
      break;
    case 'fixed':
      formattedVoucherType = { FixedAmount: { amount: discountValue } };
      break;
    case 'buyonegetone':
      formattedVoucherType = { BuyOneGetOne: {} };
      break;
    case 'event':
      formattedVoucherType = { EventTicket: { event_id: discountValue } };
      break;
    default:
      return next(new AppError('Invalid voucher type', 400));
  }

  try {
    const result = await solanaService.createVoucher(issuerWallet, formattedVoucherType, expirationTime);
    res.status(201).json({
      status: 'success',
      data: {
        voucherPublicKey: result.voucherPublicKey,
        uniqueCode: result.uniqueCode,
        barcode: result.barcode,
        signature: result.signature
      }
    });
  } catch (error) {
    return next(new AppError(`Error creating voucher: ${error.message}`, 500));
  }
});

exports.claimVoucher = catchAsync(async (req, res, next) => {
  const { voucherPublicKey } = req.params;

  // Assuming the user's wallet is attached to the request by middleware
  const claimerWallet = req.wallet;

  try {
    const signature = await solanaService.claimVoucher(claimerWallet, voucherPublicKey);
    res.status(200).json({
      status: 'success',
      data: {
        signature
      }
    });
  } catch (error) {
    return next(new AppError(`Error claiming voucher: ${error.message}`, 500));
  }
});

exports.redeemVoucher = catchAsync(async (req, res, next) => {
  const { voucherPublicKey } = req.params;

  // Assuming the user's wallet is attached to the request by middleware
  const claimerWallet = req.wallet;

  try {
    const signature = await solanaService.redeemVoucher(claimerWallet, voucherPublicKey);
    res.status(200).json({
      status: 'success',
      data: {
        signature
      }
    });
  } catch (error) {
    return next(new AppError(`Error redeeming voucher: ${error.message}`, 500));
  }
});

exports.redeemVoucherByCode = catchAsync(async (req, res, next) => {
  const { uniqueCode } = req.body;

  if (!uniqueCode) {
    return next(new AppError('Unique code is required', 400));
  }

  // Assuming the user's wallet is attached to the request by middleware
  const claimerWallet = req.wallet;

  try {
    const signature = await solanaService.redeemVoucherByCode(claimerWallet, uniqueCode);
    res.status(200).json({
      status: 'success',
      data: {
        signature
      }
    });
  } catch (error) {
    return next(new AppError(`Error redeeming voucher: ${error.message}`, 500));
  }
});

exports.getVoucherDetails = catchAsync(async (req, res, next) => {
    const { voucherPublicKey } = req.params;
  
    const voucherDetails = await solanaService.getVoucherDetails(voucherPublicKey);
    res.status(200).json({
      status: 'success',
      data: { voucherDetails }
    });
  });
  
  exports.getAllVouchers = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
  
    const vouchers = await solanaService.getAllVouchers(skip, limit);
    const totalVouchers = await solanaService.getVoucherCount();
  
    res.status(200).json({
      status: 'success',
      results: vouchers.length,
      totalPages: Math.ceil(totalVouchers / limit),
      currentPage: page,
      data: { vouchers }
    });
  });
  
  exports.getVouchersByIssuer = catchAsync(async (req, res, next) => {
    const { issuerPublicKey } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
  
    const vouchers = await solanaService.getVouchersByIssuer(issuerPublicKey, skip, limit);
    const totalVouchers = await solanaService.getVoucherCountByIssuer(issuerPublicKey);
  
    res.status(200).json({
      status: 'success',
      results: vouchers.length,
      totalPages: Math.ceil(totalVouchers / limit),
      currentPage: page,
      data: { vouchers }
    });
  });
  
  exports.searchVouchers = catchAsync(async (req, res, next) => {
    const { query, voucherType, minValue, maxValue, status } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
  
    const searchCriteria = { query, voucherType, minValue, maxValue, status };
    const vouchers = await solanaService.searchVouchers(searchCriteria, skip, limit);
    const totalVouchers = await solanaService.getSearchVoucherCount(searchCriteria);
  
    res.status(200).json({
      status: 'success',
      results: vouchers.length,
      totalPages: Math.ceil(totalVouchers / limit),
      currentPage: page,
      data: { vouchers }
    });
  });
  
  exports.getVouchersByStatus = catchAsync(async (req, res, next) => {
    const { status } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
  
    if (!['active', 'expired', 'redeemed'].includes(status)) {
      return next(new AppError('Invalid status. Must be active, expired, or redeemed', 400));
    }
  
    const vouchers = await solanaService.getVouchersByStatus(status, skip, limit);
    const totalVouchers = await solanaService.getVoucherCountByStatus(status);
  
    res.status(200).json({
      status: 'success',
      results: vouchers.length,
      totalPages: Math.ceil(totalVouchers / limit),
      currentPage: page,
      data: { vouchers }
    });
  });
  
  exports.updateVoucher = catchAsync(async (req, res, next) => {
    const { voucherPublicKey } = req.params;
    const { expirationTime, discountValue } = req.body;
  
    // Validate input
    const validationError = validateUpdateVoucherInput(expirationTime, discountValue);
    if (validationError) {
      return next(new AppError(validationError, 400));
    }
  
    // Assuming the user's wallet is attached to the request by middleware
    const issuerWallet = req.wallet;
  
    const updatedVoucher = await solanaService.updateVoucher(issuerWallet, voucherPublicKey, expirationTime, discountValue);
    
    res.status(200).json({
      status: 'success',
      data: { voucher: updatedVoucher }
    });
  });