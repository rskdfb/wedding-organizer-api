const midtransClient = require('midtrans-client');
const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  const { eventId, amount } = req.body;

  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const transactionDetails = {
      transaction_details: {
        order_id: `order-${Date.now()}`,
        gross_amount: amount,
      },
    };

    const midtransResponse = await snap.createTransaction(transactionDetails);

    // Simpan transaksi ke database
    await Transaction.create({
      userId: req.user.id,
      eventId,
      amount,
      status: 'pending',
      midtransTransactionId: midtransResponse.token,
    });

    res.json(midtransResponse);
  } catch (error) {
    res.status(500).json({ message: 'Transaction failed', error: error.message });
  }
};
