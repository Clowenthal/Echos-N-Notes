const app = require('./app');  // Import the Express app
const PORT = process.env.PORT || 3001;  // Get the port from environment variables or use 3001

app.listen(PORT, () => {  // Start the server
  console.log(`Server running on port ${PORT}`);  // Log success message
});
