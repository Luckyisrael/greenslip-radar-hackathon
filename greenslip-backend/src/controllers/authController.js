// File: src/controllers/authController.js

const { PublicKey } = require('@solana/web3.js');
const nacl = require('tweetnacl');
const bs58 = require('bs58');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errorTypes');

// In-memory store for nonces. In a production app, use a database.
const nonceStore = new Map();

exports.getNonce = catchAsync(async (req, res) => {
  const nonce = Math.floor(Math.random() * 1000000).toString();
  nonceStore.set(nonce, Date.now());
  
  res.json({ nonce });
});

exports.verifySignature = catchAsync(async (req, res, next) => {
  const { publicKey, signature, nonce } = req.body;

  if (!nonceStore.has(nonce)) {
    return next(new AppError('Invalid or expired nonce', 400));
  }

  nonceStore.delete(nonce);

  const message = `Sign this message for authenticating with your wallet: ${nonce}`;
  const messageBytes = new TextEncoder().encode(message);

  const publicKeyBytes = bs58.decode(publicKey);
  const signatureBytes = bs58.decode(signature);

  const verified = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);

  if (!verified) {
    return next(new AppError('Invalid signature', 401));
  }

  // Create a JWT token
  const token = jwt.sign({ publicKey }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.json({
    status: 'success',
    token
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  // This assumes that the 'protect' middleware has already been run
  res.json({
    status: 'success',
    data: {
      publicKey: req.user.publicKey
    }
  });
});