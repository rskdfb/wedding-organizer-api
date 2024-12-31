const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');
const { createEvent, updateEvent, deleteEvent, getAllEvents } = require('../controllers/eventController');

const router = express.Router();

// Rute untuk mendapatkan semua event (public)
router.get('/', getAllEvents);

// Rute untuk membuat event baru (khusus admin)
router.post('/', authenticate, authorizeAdmin, createEvent);

// Rute untuk memperbarui event (khusus admin)
router.put('/:id', authenticate, authorizeAdmin, updateEvent);

// Rute untuk menghapus event (khusus admin)
router.delete('/:id', authenticate, authorizeAdmin, deleteEvent);

module.exports = router;

