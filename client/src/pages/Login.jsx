import React, { useState } from 'react';  // Import React and useState
import { gql, request } from 'graphql-request';  // Import GraphQL request functions

const LOGIN = gql`  // Define GraphQL mutation for login
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

function Login() {
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState('');  // State to store password
  const [message, setMessage] = useState('');  // State to store message

  const handleChange = (e) => {  // Handle input change
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);  // Update email state
    } else if (name === 'password') {
      setPassword(value);  // Update password state
    }
  };

  const handleSubmit = async (e) => {  // Handle form submission
    e.preventDefault();
    try {
      const data = await request(import.meta.env.VITE_GRAPHQL_ENDPOINT, LOGIN, { email, password });  // Send login request to GraphQL endpoint
      localStorage.setItem('token', data.login);  // Save JWT token in localStorage
      setMessage('Login successful!');  // Set success message
      setEmail('');  // Clear email state
      setPassword('');  // Clear password state
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');  // Set error message
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}  // Render message if it exists
    </div>
  );
}

export default Login;  // Export Login component
