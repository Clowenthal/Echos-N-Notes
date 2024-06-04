import React from 'react';
import { Link } from 'react-router-dom';
import { StyledHeader } from './styles/HeaderStyles';

const Header = () => (
  <StyledHeader>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  </StyledHeader>
);

export default Header;
