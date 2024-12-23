import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Mengambil data acara dari backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wedding Organizer</h1>
        <p>Daftar Event:</p>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>Tanggal: {new Date(event.date).toLocaleDateString()}</p>
                <p>Lokasi: {event.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Event tidak ditemukan.</p>
        )}
      </header>
    </div>
  );
}

export default App;
