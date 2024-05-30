const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./schemas/schema');
const auth = require('./middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(auth);

// GraphQL endpoint
app.use('/graphql', graphqlHTTP((req) => ({
  schema,
  graphiql: true,
  context: {
    user: req.user
  }
})));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
