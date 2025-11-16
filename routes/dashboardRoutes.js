const express = require("express");
const User = require("../models/User");
const Activity = require("../models/Activity");
const Analytics = require("../models/Analytics");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

// GET /api/dashboard/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ 1. Find user
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ 2. Fetch related data
    const analytics = await Analytics.findOne({ userId });
    const activities = await Activity.find({ userId }).sort({ date: -1 }).limit(5);
    const quizzes = await QuizResult.find({ userId }).sort({ createdAt: -1 });

    // ✅ 3. Compute overall wellness
    const avgQuizScore = quizzes.length
      ? quizzes.reduce((sum, q) => sum + (q.totalScore || 0), 0) / quizzes.length
      : 0;

    const completed = activities.filter(a => a.status === "Completed").length;
    const activityCompletionRate = Math.round(
      (completed / (activities.length || 1)) * 100
    );

    const overallWellness = Math.round((avgQuizScore + activityCompletionRate) / 2);

    // ✅ 4. Response
    res.json({
      profile: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        overallWellness,
      },
      analytics,
      activities,
      quizzes,
    });
  } catch (err) {
    console.error("❌ Dashboard fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
