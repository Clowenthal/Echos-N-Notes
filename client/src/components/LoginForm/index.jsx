import React, { useState } from 'react';  // Import React and useState
import { useMutation } from '@apollo/client';  // Import useMutation hook from Apollo Client
import { LOGIN } from '../utils/mutations';  // Import LOGIN mutation
import Auth from '../utils/auth';

function LoginForm() {
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState('');  // State to store password
  const [login, { loading, error }] = useMutation(LOGIN);  // Use Apollo Client's useMutation hook

  const handleSubmit = async (e) => {  // Handle form submission
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });  // Execute login mutation
      Auth.login(data.login);  // Save JWT token in localStorage
    } catch (error) {
      console.error('Login failed', error);  // Log error if login fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update email state on input change
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update password state on input change
          required
        />
      </div>
      <button type="submit" disabled={loading}>Login</button>  // Disable button while loading
      {error && <p>Error: {error.message}</p>}  // Show error message if login fails
    </form>
  );
}

export default LoginForm;  // Export LoginForm component
