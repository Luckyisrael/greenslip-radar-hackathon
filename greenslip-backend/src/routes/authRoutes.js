const express = require('express');
const authController = require('../controllers/authController');
const { validateNonce } = require('../middleware/validators');

const router = express.Router();

// Generate a nonce for the client to sign
router.get('/nonce', authController.getNonce);

// Verify the signed nonce and authenticate the user
//router.post('/verify', validateNonce, authController.verifySignature);

// Check if the user is authenticated
router.get('/me', authController.getMe);

module.exports = router;