const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');


// POST /api/quiz/submit
router.post('/submit', async (req, res) => {
try {
const { userId, sectionA, sectionB, totalScore, percentage, diagnosis } = req.body;
if (!userId) return res.status(400).json({ message: 'Missing userId' });


// Decide level based on percentage (same as frontend)
let level = 'genuine';
if (percentage >= 75) level = 'high';
else if (percentage >= 50) level = 'mid';


const quiz = new QuizResult({ userId, sectionA, sectionB, totalScore, percentage, diagnosis, level });
await quiz.save();


return res.status(201).json({ message: 'Quiz saved', quiz });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
});


// GET /api/quiz/user/:userId - fetch latest quiz for user
router.get('/user/:userId', async (req, res) => {
try {
const { userId } = req.params;
const quiz = await QuizResult.findOne({ userId }).sort({ createdAt: -1 }).lean();
if (!quiz) return res.status(404).json({ message: 'No quiz found' });
return res.json({ quiz });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
});


// GET /api/quiz/all/:userId - fetch all quizzes
router.get('/all/:userId', async (req, res) => {
try {
const { userId } = req.params;
const quizzes = await QuizResult.find({ userId }).sort({ createdAt: -1 }).lean();
return res.json({ quizzes });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;