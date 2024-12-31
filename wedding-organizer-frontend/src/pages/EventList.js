const handlePayment = async (eventId, price) => {
    try {
      const response = await axios.post('http://localhost:5000/api/payments/create', {
        orderId: `EVENT-${eventId}-${Date.now()}`,
        grossAmount: price,
        customerDetails: {
          email: 'user@example.com', // Ganti dengan data user
          first_name: 'User', // Ganti dengan data user
        },
      });
  
      // Redirect ke halaman pembayaran Midtrans
      window.snap.pay(response.data.redirect_url);
    } catch (error) {
      console.error(error);
      alert('Gagal memulai pembayaran.');
    }
  };
  
  return (
    <button className="btn btn-primary" onClick={() => handlePayment(event.id, event.price)}>
      Bayar
    </button>
  );
  
