import React, { useState } from 'react';  // Import React and useState
import { useMutation } from '@apollo/client';  // Import useMutation hook from Apollo Client
import { REGISTER } from '../utils/mutations';  // Import REGISTER mutation

function RegisterForm() {
  const [username, setUsername] = useState('');  // State to store username
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState('');  // State to store password
  const [register, { loading, error }] = useMutation(REGISTER);  // Use Apollo Client's useMutation hook

  const handleSubmit = async (e) => {  // Handle form submission
    e.preventDefault();
    try {
      await register({ variables: { username, email, password } });  // Execute registration mutation
    } catch (error) {
      console.error('Registration failed', error);  // Log error if registration fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Update username state on input change
          required
        />
      </div>
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
      <button type="submit" disabled={loading}>Register</button>  // Disable button while loading
      {error && <p>Error: {error.message}</p>}  // Show error message if registration fails
    </form>
  );
}

export default RegisterForm;  // Export RegisterForm component
