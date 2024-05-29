import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
