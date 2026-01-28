import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Items from './pages/Items';
import ItemDetails from './pages/ItemDetails'; // Import the new component
import PostItem from './pages/PostItem';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container" style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/items" element={<Items />} />
              <Route path="/items/:id" element={<ItemDetails />} /> {/* Add this route */}
              <Route path="/post" element={
                <PrivateRoute>
                  <PostItem />
                </PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <footer className="footer">
            <div className="container">
              <p>© 2024 Campus Sharing Platform. All rights reserved.</p>
              <p style={{ marginTop: '8px', color: '#9ca3af' }}>Built with React & Flask</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;