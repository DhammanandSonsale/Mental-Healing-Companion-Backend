const mongoose = require('mongoose');


const AnswerSchema = new mongoose.Schema({
question: String,
answer: Number,
});


const QuizResultSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
sectionA: [AnswerSchema],
sectionB: [AnswerSchema],
totalScore: Number,
percentage: Number,
diagnosis: String,
level: { type: String, enum: ['genuine', 'mid', 'high'] }, // mapping to buttons
createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('QuizResult', QuizResultSchema);