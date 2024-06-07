const mongoose = require('mongoose');  // Import mongoose

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/echosnnotes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');  // Log success message if connected
  } catch (err) {
    console.error(err.message);  // Log error message if connection fails
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;  // Export the connectDB function
