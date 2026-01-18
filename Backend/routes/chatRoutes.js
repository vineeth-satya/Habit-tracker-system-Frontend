const express = require("express");
const axios = require("axios");
const router = express.Router();
const Habit = require("../models/Habit");
const HabitCompletion = require("../models/HabitCompletion");

router.post("/", async (req, res) => {
  try {
    // TEMP: mock user context (no JWT yet)
    const habits = await Habit.find({});
    const completions = await HabitCompletion.find({});

    const context = {
      totalHabits: habits.length,
      completedCount: completions.length,
      habits: habits.map(h => ({
        title: h.title,
        frequency: h.frequency
      }))
    };

    const aiResponse = await axios.post(
      "http://localhost:8000/chat",
      {
        message: req.body.message,
        context
      }
    );

    res.json(aiResponse.data);
  } catch (err) {
    console.error("AI chat error:", err.message);
    res.status(500).json({ message: "AI service error" });
  }
});

module.exports = router;
