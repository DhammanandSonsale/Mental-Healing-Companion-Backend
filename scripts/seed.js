// scripts/seed.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// require your models (adjust paths if different)
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Activity = require('../models/Activity');
const Analytics = require('../models/Analytics');

const MONGO_URI = process.env.MONGO_URI;

async function createHashedPassword(plain = 'password123') {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // optional: clear old data
    await Promise.all([
      User.deleteMany({}),
      Quiz.deleteMany({}),
      Activity.deleteMany({}),
      Analytics.deleteMany({})
    ]);
    console.log('🧹 Cleared existing data');

    // Create users
    const pass1 = await createHashedPassword('aarav_pass');
    const pass2 = await createHashedPassword('rhea_pass');
    const pass3 = await createHashedPassword('vijay_pass');

    const users = await User.insertMany([
      {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        password: pass1,
        createdAt: new Date('2025-10-01'),
      },
      {
        name: 'Rhea Kapoor',
        email: 'rhea.kapoor@example.com',
        password: pass2,
        createdAt: new Date('2025-09-20'),
      },
      {
        name: 'Vijay Kumar',
        email: 'vijay.kumar@example.com',
        password: pass3,
        createdAt: new Date('2025-08-15'),
      }
    ]);

    console.log(`👥 Inserted ${users.length} users`);

    // Build quizzes
    const quizzes = [
      // Aarav quizzes
      {
        userId: users[0]._id,
        title: 'Mindfulness Check',
        category: 'Mindfulness',
        score: 92,
        insights: 'Great awareness and breath control.',
        dateTaken: new Date('2025-11-07T09:00:00Z')
      },
      {
        userId: users[0]._id,
        title: 'Stress Assessment',
        category: 'Stress',
        score: 85,
        insights: 'Low to moderate stress; keep journaling.',
        dateTaken: new Date('2025-10-28T10:30:00Z')
      },

      // Rhea quizzes
      {
        userId: users[1]._id,
        title: 'Mood Snapshot',
        category: 'Mood',
        score: 76,
        insights: 'Stable mood with occasional dips.',
        dateTaken: new Date('2025-11-06T08:45:00Z')
      },
      {
        userId: users[1]._id,
        title: 'Resilience Quiz',
        category: 'Resilience',
        score: 81,
        insights: 'Good coping strategies.',
        dateTaken: new Date('2025-10-15T12:00:00Z')
      },

      // Vijay quizzes
      {
        userId: users[2]._id,
        title: 'Mindfulness Check',
        category: 'Mindfulness',
        score: 62,
        insights: 'Focus practice recommended.',
        dateTaken: new Date('2025-11-01T07:30:00Z')
      },
      {
        userId: users[2]._id,
        title: 'Stress Assessment',
        category: 'Stress',
        score: 48,
        insights: 'Consider daily breathing exercises.',
        dateTaken: new Date('2025-10-05T09:15:00Z')
      }
    ];

    await Quiz.insertMany(quizzes);
    console.log(`📝 Inserted ${quizzes.length} quizzes`);

    // Build activities
    const activities = [
      // Aarav activities (recent)
      {
        userId: users[0]._id,
        sessionName: 'Mindful Breathing',
        duration: '10 min',
        mood: 'Calm',
        status: 'Completed',
        date: new Date('2025-11-07T18:30:00Z')
      },
      {
        userId: users[0]._id,
        sessionName: 'Gratitude Journal',
        duration: '8 min',
        mood: 'Relaxed',
        status: 'Completed',
        date: new Date('2025-11-06T07:45:00Z')
      },
      {
        userId: users[0]._id,
        sessionName: 'CBT Exercise',
        duration: '12 min',
        mood: 'Balanced',
        status: 'Pending',
        date: new Date('2025-11-05T14:00:00Z')
      },

      // Rhea activities
      {
        userId: users[1]._id,
        sessionName: 'Guided Meditation',
        duration: '15 min',
        mood: 'Peaceful',
        status: 'Completed',
        date: new Date('2025-11-06T19:00:00Z')
      },
      {
        userId: users[1]._id,
        sessionName: 'Breathing Reset',
        duration: '6 min',
        mood: 'Refreshed',
        status: 'Completed',
        date: new Date('2025-11-05T08:20:00Z')
      },

      // Vijay activities
      {
        userId: users[2]._id,
        sessionName: 'Focus Timer',
        duration: '20 min',
        mood: 'Distracted',
        status: 'Completed',
        date: new Date('2025-11-01T15:00:00Z')
      },
      {
        userId: users[2]._id,
        sessionName: 'Evening Reflection',
        duration: '10 min',
        mood: 'Tired',
        status: 'Pending',
        date: new Date('2025-10-30T21:00:00Z')
      }
    ];

    await Activity.insertMany(activities);
    console.log(`🏃 Inserted ${activities.length} activities`);

    // Analytics docs (small weekly mood arrays)
    const analyticsDocs = [
      {
        userId: users[0]._id,
        overallWellness: 94,
        weeklyMoodData: [
          { day: 'Mon', moodScore: 72 },
          { day: 'Tue', moodScore: 78 },
          { day: 'Wed', moodScore: 82 },
          { day: 'Thu', moodScore: 70 },
          { day: 'Fri', moodScore: 90 },
          { day: 'Sat', moodScore: 74 },
          { day: 'Sun', moodScore: 76 }
        ],
        lastUpdated: new Date()
      },
      {
        userId: users[1]._id,
        overallWellness: 79,
        weeklyMoodData: [
          { day: 'Mon', moodScore: 68 },
          { day: 'Tue', moodScore: 74 },
          { day: 'Wed', moodScore: 77 },
          { day: 'Thu', moodScore: 73 },
          { day: 'Fri', moodScore: 82 },
          { day: 'Sat', moodScore: 70 },
          { day: 'Sun', moodScore: 75 }
        ],
        lastUpdated: new Date()
      },
      {
        userId: users[2]._id,
        overallWellness: 55,
        weeklyMoodData: [
          { day: 'Mon', moodScore: 50 },
          { day: 'Tue', moodScore: 48 },
          { day: 'Wed', moodScore: 60 },
          { day: 'Thu', moodScore: 55 },
          { day: 'Fri', moodScore: 52 },
          { day: 'Sat', moodScore: 58 },
          { day: 'Sun', moodScore: 56 }
        ],
        lastUpdated: new Date()
      }
    ];

    await Analytics.insertMany(analyticsDocs);
    console.log(`📊 Inserted ${analyticsDocs.length} analytics docs`);

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
