import React, { useState } from 'react';  // Import React and useState
import { gql, request } from 'graphql-request';  // Import GraphQL request functions

const REGISTER = gql`  // Define GraphQL mutation for registration
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
    }
  }
`;

function Register() {
  const [username, setUsername] = useState('');  // State to store username
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState('');  // State to store password
  const [message, setMessage] = useState('');  // State to store message

  const handleChange = (e) => {  // Handle input change
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);  // Update username state
    } else if (name === 'email') {
      setEmail(value);  // Update email state
    } else if (name === 'password') {
      setPassword(value);  // Update password state
    }
  };

  const handleSubmit = async (e) => {  // Handle form submission
    e.preventDefault();
    try {
      await request(import.meta.env.VITE_GRAPHQL_ENDPOINT, REGISTER, { username, email, password });  // Send registration request to GraphQL endpoint
      setMessage('Registration successful!');  // Set success message
      setUsername('');  // Clear username state
      setEmail('');  // Clear email state
      setPassword('');  // Clear password state
    } catch (error) {
      setMessage('Registration failed. Please try again.');  // Set error message
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}  // Render message if it exists
    </div>
  );
}

export default Register;  // Export Register component
