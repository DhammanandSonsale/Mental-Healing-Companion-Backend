// scripts/verifyData.js

require('dotenv').config({ path: '../.env' }); // 👈 tells dotenv where .env is
const mongoose = require('mongoose');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Activity = require('../models/Activity');
const Analytics = require('../models/Analytics');

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is undefined! Check your .env path or variable name.");
  process.exit(1);
}

mongoose.connect(uri)
  .then(async () => {
    console.log("✅ Connected to MongoDB Atlas");

    const users = await User.countDocuments();
    const quizzes = await Quiz.countDocuments();
    const activities = await Activity.countDocuments();
    const analytics = await Analytics.countDocuments();

    console.log({ users, quizzes, activities, analytics });
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection error:", err.message);
    process.exit(1);
  });
