const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Pastikan model User sudah ada

// Middleware untuk autentikasi JWT
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Tambahkan informasi pengguna ke request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Middleware untuk otorisasi admin
const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id); // Cari pengguna berdasarkan ID dari token
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Akses hanya untuk admin' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

module.exports = { authenticate, authorizeAdmin };
