const fetch = require("node-fetch");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getGeminiRecommendations(quizData) {
  try {
    const prompt = `
You are a certified digital mental health assistant for the platform "Mental Healing Companion".

Analyze this user's quiz result and provide personalized recommendations for mental health improvement.

User Quiz Result:
${JSON.stringify(quizData, null, 2)}

Return a JSON ONLY response in this exact structure:

{
  "categories": ["Anxiety Relief", "Sleep Improvement", "Mindfulness"],
  "suggestions": {
    "videos": [
      {"title": "Guided Breathing for Calm", "duration": "8 min", "link": "https://mentalhealingcompanion.com/videos/breathing"},
      {"title": "Relax Before Sleep", "duration": "10 min", "link": "https://mentalhealingcompanion.com/videos/sleep-calm"}
    ],
    "exercises": [
      {"title": "Thought Reframing Exercise", "type": "CBT", "duration": "15 min"},
      {"title": "Gratitude Journaling (7 Days)", "type": "Self-awareness", "duration": "7 days"}
    ],
    "audio": [
      {"title": "Morning Positivity Boost", "duration": "5 min"},
      {"title": "Body Scan for Relaxation", "duration": "12 min"}
    ],
    "blogs": [
      {"title": "How to Calm an Overthinking Mind", "link": "https://mentalhealingcompanion.com/blogs/overthinking"},
      {"title": "The Power of Self-Compassion", "link": "https://mentalhealingcompanion.com/blogs/self-kindness"}
    ],
    "tasks": [
      {"day": 1, "task": "Take a 10-minute mindful walk"},
      {"day": 2, "task": "Write 3 things you're grateful for"},
      {"day": 3, "task": "Try a breathing exercise before bed"}
    ]
  }
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Try parsing Gemini response safely
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (err) {
      console.error("⚠️ Could not parse Gemini JSON:", text);
      return null;
    }
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return null;
  }
}

module.exports = { getGeminiRecommendations };
