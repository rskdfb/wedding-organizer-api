
const Event = require('../models/Event');

// Mendapatkan semua event
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan event.' });
  }
};

// Membuat event baru
const createEvent = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newEvent = await Event.create({ name, description, price });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat event.' });
  }
};

// Memperbarui event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Event tidak ditemukan.' });

    event.name = name || event.name;
    event.description = description || event.description;
    event.price = price || event.price;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui event.' });
  }
};

// Menghapus event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Event tidak ditemukan.' });

    await event.destroy();
    res.json({ message: 'Event berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus event.' });
  }
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
