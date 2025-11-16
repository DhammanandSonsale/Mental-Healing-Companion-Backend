// app.js
require('dotenv').config(); // ✅ Load environment variables first

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const dashboardRoutes = require('./routes/dashboardRoutes');
const quizRoutes = require('./routes/quiz');
const contentRoutes = require('./routes/content');


const app = express();

// Middleware
app.use(express.json());
app.use(cors());



// ✅ Connect to MongoDB (ensure MONGO_URI exists)
if (!process.env.MONGO_URI) {
  console.error('❌ Missing MONGO_URI in .env file');
  process.exit(1); // Stop the server if no DB URI
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB ✅'))
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err);
    process.exit(1);
  });


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/quiz', quizRoutes);
app.use('/api/content', contentRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
