import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const role = localStorage.getItem('role'); // Mengambil role (admin/user) dari localStorage

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Wedding Organizer
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Dashboard Admin
                </Link>
              </li>
            )}
            {role === 'user' && (
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  Dashboard User
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

