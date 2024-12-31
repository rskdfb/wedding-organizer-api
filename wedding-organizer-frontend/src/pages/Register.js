import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role user

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        role,
      });
      alert('Registrasi Berhasil!');
    } catch (error) {
      console.error(error);
      alert('Gagal registrasi.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
