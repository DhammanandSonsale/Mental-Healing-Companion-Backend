require('dotenv').config({ path: '../.env' }); // 👈 tells dotenv where .env is
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Analytics = require("../models/Analytics");
const Activity = require("../models/Activity");
const Quiz = require("../models/Quiz");


// ✅ Connect to MongoDB (change URI if using Atlas)
mongoose.connect(process.env.MONGO_URI);

async function seedMoreData() {
  try {
    console.log("🌿 Adding 3 more users...");

    const newUsers = [
      {
        name: "Kabir Singh",
        email: "kabir.singh@example.com",
        password: await bcrypt.hash("12345678", 10),
      },
      {
        name: "Meera Nair",
        email: "meera.nair@example.com",
        password: await bcrypt.hash("12345678", 10),
      },
      {
        name: "Rohan Desai",
        email: "rohan.desai@example.com",
        password: await bcrypt.hash("12345678", 10),
      },
    ];

    const createdUsers = await User.insertMany(newUsers);

    // ✅ Analytics for each new user
    const analyticsData = [
      {
        userId: createdUsers[0]._id,
        overallWellness: 90,
        weeklyMoodData: [
          { day: "Mon", mood: 8 },
          { day: "Tue", mood: 9 },
          { day: "Wed", mood: 9 },
          { day: "Thu", mood: 8 },
          { day: "Fri", mood: 9 },
          { day: "Sat", mood: 10 },
          { day: "Sun", mood: 10 },
        ],
      },
      {
        userId: createdUsers[1]._id,
        overallWellness: 75,
        weeklyMoodData: [
          { day: "Mon", mood: 6 },
          { day: "Tue", mood: 7 },
          { day: "Wed", mood: 6 },
          { day: "Thu", mood: 7 },
          { day: "Fri", mood: 8 },
          { day: "Sat", mood: 7 },
          { day: "Sun", mood: 8 },
        ],
      },
      {
        userId: createdUsers[2]._id,
        overallWellness: 82,
        weeklyMoodData: [
          { day: "Mon", mood: 7 },
          { day: "Tue", mood: 8 },
          { day: "Wed", mood: 8 },
          { day: "Thu", mood: 9 },
          { day: "Fri", mood: 7 },
          { day: "Sat", mood: 8 },
          { day: "Sun", mood: 9 },
        ],
      },
    ];
    await Analytics.insertMany(analyticsData);

    // ✅ Activities (recent sessions)
    const activities = [
      // Kabir
      {
        userId: createdUsers[0]._id,
        sessionName: "Deep Breathing Meditation",
        date: new Date("2025-11-07"),
        duration: 12,
        mood: "😌 Calm",
        status: "Completed",
      },
      {
        userId: createdUsers[0]._id,
        sessionName: "Mindful Stretching",
        date: new Date("2025-11-06"),
        duration: 15,
        mood: "🌿 Relaxed",
        status: "Completed",
      },
      {
        userId: createdUsers[0]._id,
        sessionName: "Body Awareness Session",
        date: new Date("2025-11-05"),
        duration: 10,
        mood: "🙂 Centered",
        status: "Pending",
      },

      // Meera
      {
        userId: createdUsers[1]._id,
        sessionName: "Creative Journaling",
        date: new Date("2025-11-07"),
        duration: 20,
        mood: "🎨 Inspired",
        status: "Completed",
      },
      {
        userId: createdUsers[1]._id,
        sessionName: "Mood Reflection",
        date: new Date("2025-11-06"),
        duration: 10,
        mood: "🌸 Peaceful",
        status: "Completed",
      },
      {
        userId: createdUsers[1]._id,
        sessionName: "Guided Visualization",
        date: new Date("2025-11-05"),
        duration: 15,
        mood: "✨ Creative",
        status: "Pending",
      },

      // Rohan
      {
        userId: createdUsers[2]._id,
        sessionName: "Stress Tracking Exercise",
        date: new Date("2025-11-07"),
        duration: 10,
        mood: "😐 Neutral",
        status: "Completed",
      },
      {
        userId: createdUsers[2]._id,
        sessionName: "CBT Practice",
        date: new Date("2025-11-06"),
        duration: 12,
        mood: "🙂 Balanced",
        status: "Completed",
      },
      {
        userId: createdUsers[2]._id,
        sessionName: "Mindfulness Challenge",
        date: new Date("2025-11-05"),
        duration: 15,
        mood: "😊 Calm",
        status: "Completed",
      },
    ];

    await Activity.insertMany(activities);

    // ✅ Quizzes
    const quizzes = [
      { userId: createdUsers[0]._id, title: "Focus Assessment", score: 93 },
      { userId: createdUsers[0]._id, title: "Emotional Balance", score: 87 },
      { userId: createdUsers[1]._id, title: "Self-Expression Scale", score: 78 },
      { userId: createdUsers[1]._id, title: "Gratitude Quiz", score: 84 },
      { userId: createdUsers[2]._id, title: "Cognitive Awareness", score: 88 },
      { userId: createdUsers[2]._id, title: "Anxiety Tracker", score: 81 },
    ];

    await Quiz.insertMany(quizzes);

    console.log("✅ Added 3 new profiles successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting new profiles:", err);
    mongoose.connection.close();
  }
}

seedMoreData();
