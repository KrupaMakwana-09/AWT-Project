import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0 }}>📚 Library Management System</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/books" style={{ color: 'white', textDecoration: 'none' }}>Books</Link>
        <Link to="/members" style={{ color: 'white', textDecoration: 'none' }}>Members</Link>
        <Link to="/transactions" style={{ color: 'white', textDecoration: 'none' }}>Transactions</Link>
      </div>
    </nav>
  );
}

export default Navbar;