const express = require('express');
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createEvent);
router.get('/', getAllEvents);
router.put('/:id', authMiddleware, adminMiddleware, updateEvent);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEvent);

module.exports = router;
