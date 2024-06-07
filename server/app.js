const express = require('express');  // Import Express
const { graphqlHTTP } = require('express-graphql');  // Import Express-GraphQL
const schema = require('./schema');  // Import GraphQL schema
const connectDB = require('./config/connection');  // Import database connection function
const auth = require('./middleware/auth');  // Import authentication middleware
const cors = require('cors');  // Import CORS middleware

const app = express();  // Create Express app
require('dotenv').config();  // Load environment variables

connectDB();  // Connect to the database

app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON request bodies
app.use(auth);  // Use authentication middleware

app.use('/graphql', graphqlHTTP({  // Set up GraphQL endpoint
  schema,  // GraphQL schema
  graphiql: true,  // Enable GraphiQL interface
}));

module.exports = app;  // Export the Express app
