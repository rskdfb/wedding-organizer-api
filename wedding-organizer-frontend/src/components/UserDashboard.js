import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get('http://localhost:5000/api/payments/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(response.data);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Dashboard User</h1>
      <h2>Riwayat Transaksi</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Jumlah</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.order_id}</td>
              <td>{transaction.gross_amount}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
