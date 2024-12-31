const express = require('express');
const { createPayment } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Rute untuk membuat transaksi pembayaran
router.post('/create', verifyToken, createPayment);

module.exports = router;
