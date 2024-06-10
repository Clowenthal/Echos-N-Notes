import { useState } from 'react';  // Import React and useState
import { useMutation } from '@apollo/client';  // Import useMutation hook from Apollo Client
import { REGISTER } from '../utils/mutations';  // Import REGISTER mutation

function RegisterForm() {
  const [username, setUsername] = useState('');  // State to store username
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState('');  // State to store password
  const [register] = useMutation(REGISTER);  // Use Apollo Client's useMutation hook

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
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Register</button>
      {/* {Insert additional form-related comments here} */}
    </form>
  );
}

export default RegisterForm;  // Export RegisterForm component