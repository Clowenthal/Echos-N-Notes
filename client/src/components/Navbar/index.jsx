import { Link } from 'react-router-dom';  // Import Link component from React Router

function Navbar() {

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/post">Post Blog</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;  // Export Navbar component
