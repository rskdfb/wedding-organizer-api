import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    price: '',
  });

  const createEvent = async () => {
    try {
      await axios.post('http://localhost:5000/api/events', newEvent);
      alert('Event berhasil ditambahkan!');
      window.location.reload(); // Refresh halaman
    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan event.');
    }
  };

  return (
    <div>
      <h2>Tambah Event Baru</h2>
      <input
        type="text"
        placeholder="Nama Event"
        value={newEvent.name}
        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
      />
      <textarea
        placeholder="Deskripsi Event"
        value={newEvent.description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
      ></textarea>
      <input
        type="number"
        placeholder="Harga"
        value={newEvent.price}
        onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
      />
      <button onClick={createEvent}>Tambah Event</button>
    </div>
  );
}

export default AdminDashboard;


