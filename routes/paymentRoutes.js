const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/create', paymentController.createTransaction);

module.exports = router;
