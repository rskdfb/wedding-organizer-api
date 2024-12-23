const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true jika menggunakan lingkungan produksi
  serverKey: 'YOUR_SERVER_KEY',
  clientKey: 'YOUR_CLIENT_KEY',
});

module.exports = snap;
