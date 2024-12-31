import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handlePayment = async (eventId, price) => {
    try {
      const response = await axios.post('http://localhost:5000/api/payments/create', {
        orderId: `EVENT-${eventId}-${Date.now()}`,
        grossAmount: price,
        customerDetails: {
          email: 'user@example.com',
          first_name: 'User',
        },
      });
      window.snap.pay(response.data.redirect_url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Daftar Event</h1>
      {events.length === 0 ? (
        <p>Event tidak ditemukan.</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{event.name}</h5>
              <p className="card-text">{event.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => handlePayment(event.id, event.price)}>
                Bayar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
