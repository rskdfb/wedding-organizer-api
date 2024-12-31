const midtransClient = require('midtrans-client');

// Initialize Snap API client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Create Payment
exports.createPayment = async (req, res) => {
  const { orderId, grossAmount, customerDetails } = req.body;

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    customer_details: customerDetails,
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({ redirect_url: transaction.redirect_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

