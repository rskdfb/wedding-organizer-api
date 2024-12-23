const snap = require('../config/midtrans');
const { Payment, User, Event } = require('../models');

exports.createTransaction = async (req, res) => {
  try {
    const { userId, eventId, amount } = req.body;

    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: 'User or Event not found' });
    }

    const transactionDetails = {
      transaction_details: {
        order_id: `order-${Date.now()}`,
        gross_amount: amount,
      },
      customer_details: {
        first_name: user.name,
        email: user.email,
      },
      item_details: [
        {
          id: event.id,
          price: amount,
          quantity: 1,
          name: event.name,
        },
      ],
    };

    const paymentResponse = await snap.createTransaction(transactionDetails);

    await Payment.create({
      userId,
      eventId,
      amount,
      status: 'pending',
    });

    res.json(paymentResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
