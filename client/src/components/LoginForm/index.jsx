import { useState } from 'react';  // Import React and useState
import { useMutation } from '@apollo/client';  // Import useMutation hook from Apollo Client
import { LOGIN } from '../utils/mutations';  // Import LOGIN mutation
import Auth from '../utils/auth';

function LoginForm() {
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState('');  // State to store password
  const [login] = useMutation(LOGIN);  // Use Apollo Client's useMutation hook

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
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
      {/* {Insert additional form-related comments here} */}
    </form>
  );
}

export default LoginForm;  // Export LoginForm component

