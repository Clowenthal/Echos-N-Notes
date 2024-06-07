import React from 'react';  // Import React
import { Link } from 'react-router-dom';  // Import Link component from React Router
import Auth from '../utils/auth';

function Navbar() {
  const loggedIn = Auth.loggedIn();

  return (
    <nav>
      <Link to="/">Home</Link>
      {loggedIn ? (
        <>
          <span>{Auth.getProfile().email}</span>
          <button onClick={() => Auth.logout()}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;  // Export Navbar component
