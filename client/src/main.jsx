import React from 'react';  // Import React library
import ReactDOM from 'react-dom';  // Import ReactDOM for rendering
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router for navigation
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';  // Import Apollo Client libraries
import { setContext } from '@apollo/client/link/context';  // Import context link for setting headers
import App from './App';  // Import main App component
import './App.css';
import Auth from './utils/auth';


// Create an HTTP link to the GraphQL endpoint
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

// Set up authentication context to include JWT token in headers
const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();  // Get token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',  // Add token to headers if it exists
    },
  };
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),  // Combine authLink and httpLink
  cache: new InMemoryCache(),  // Initialize cache
});

// Render the React application
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>  // Provide Apollo Client to the React application
      <Router>
        <App />  // Render the App component
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')  // Mount the application to the root div
);

