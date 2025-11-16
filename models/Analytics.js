// models/Analytics.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  overallWellness: { type: Number, default: 0 },
  weeklyMoodData: [
    {
      day: String,
      moodScore: Number // e.g. 80 = calm, 50 = neutral, 20 = stressed
    }
  ],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
