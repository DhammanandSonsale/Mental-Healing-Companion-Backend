// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionName: { type: String, required: true }, // e.g. "Mindful Breathing"
  duration: { type: String, required: true }, // e.g. "10 min"
  mood: { type: String, default: 'Neutral' },
  status: {
    type: String,
    enum: ['Completed', 'Pending'],
    default: 'Pending'
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
