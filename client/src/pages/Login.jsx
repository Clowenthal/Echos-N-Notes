import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_USER);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      localStorage.setItem('token', data.loginUser.token);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
