const express = require('express');
const voucherController = require('../controllers/voucherController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: Voucher management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Voucher:
 *       type: object
 *       properties:
 *         voucherPublicKey:
 *           type: string
 *         voucherType:
 *           type: string
 *           enum: [percentage, fixed, buyonegetone, event]
 *         issuer:
 *           type: string
 *         claimer:
 *           type: string
 *         isRedeemed:
 *           type: boolean
 *         expirationTime:
 *           type: integer
 *         uniqueCode:
 *           type: string
 *         discountValue:
 *           type: number
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Public routes

/**
 * @swagger
 * /vouchers/search:
 *   get:
 *     summary: Search vouchers
 *     tags: [Vouchers]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voucher'
 */
router.get('/search', voucherController.searchVouchers);

/**
 * @swagger
 * /vouchers/{voucherPublicKey}:
 *   get:
 *     summary: Get voucher details
 *     tags: [Vouchers]
 *     parameters:
 *       - in: path
 *         name: voucherPublicKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Voucher details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       404:
 *         description: Voucher not found
 */
router.get('/:voucherPublicKey', voucherController.getVoucherDetails);

// Protected routes
router.use(authMiddleware.protect);

/**
 * @swagger
 * /vouchers/create:
 *   post:
 *     summary: Create a new voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - voucherType
 *               - expirationTime
 *               - discountValue
 *             properties:
 *               voucherType:
 *                 type: string
 *                 enum: [percentage, fixed, buyonegetone, event]
 *               expirationTime:
 *                 type: integer
 *               discountValue:
 *                 type: number
 *     responses:
 *       201:
 *         description: Voucher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/create', authMiddleware.restrictTo('business'), voucherController.createVoucher);

/**
 * @swagger
 * /vouchers/claim/{voucherPublicKey}:
 *   post:
 *     summary: Claim a voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: voucherPublicKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Voucher claimed successfully
 *       400:
 *         description: Voucher already claimed or expired
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voucher not found
 */
router.post('/claim/:voucherPublicKey', voucherController.claimVoucher);

/**
 * @swagger
 * /vouchers/redeem/{voucherPublicKey}:
 *   post:
 *     summary: Redeem a voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: voucherPublicKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Voucher redeemed successfully
 *       400:
 *         description: Voucher already redeemed or expired
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voucher not found
 */
router.post('/redeem/:voucherPublicKey', voucherController.redeemVoucher);

/**
 * @swagger
 * /vouchers/redeem-by-code:
 *   post:
 *     summary: Redeem a voucher by unique code
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uniqueCode
 *             properties:
 *               uniqueCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Voucher redeemed successfully
 *       400:
 *         description: Invalid code or voucher already redeemed or expired
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voucher not found
 */
router.post('/redeem-by-code', voucherController.redeemVoucherByCode);

/**
 * @swagger
 * /vouchers/issuer/{issuerPublicKey}:
 *   get:
 *     summary: Get vouchers by issuer
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: issuerPublicKey
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of vouchers by issuer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voucher'
 */
router.get('/issuer/:issuerPublicKey', voucherController.getVouchersByIssuer);

/**
 * @swagger
 * /vouchers:
 *   get:
 *     summary: Get all vouchers (for business users)
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all vouchers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Voucher'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware.restrictTo('business'), voucherController.getAllVouchers);

module.exports = router;