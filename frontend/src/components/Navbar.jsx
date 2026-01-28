import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const CampusIcon = () => (
    <svg className="logo-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L1 8l11 6 11-6-11-6zm0 7l-7-3.5 7-3.5 7 3.5L12 9z"/>
      <path d="M12 14l-7-3.5v7l7 3.5 7-3.5v-7L12 14z"/>
    </svg>
  );

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <CampusIcon />
          <span>Campus Share</span>
        </Link>

        <div className="nav-links">
          <Link to="/items" className="nav-link">Browse Items</Link>
          
          {user ? (
            <>
              <Link to="/post" className="nav-link">Post Item</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Logout
              </button>
              <span style={{ color: '#6b7280' }}>Welcome, {user.first_name}!</span>
            </>
          ) : (
            <>
              <Link to="/login" className="btn" style={{ background: 'none', color: '#3b82f6', border: '1px solid #3b82f6' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;