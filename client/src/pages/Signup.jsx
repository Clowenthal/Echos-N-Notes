import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const SIGNUP_USER = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupUser] = useMutation(SIGNUP_USER);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser({ variables: { name, email, password } });
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
