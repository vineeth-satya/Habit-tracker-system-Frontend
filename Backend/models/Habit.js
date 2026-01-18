const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: String,
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true
  },
  targetCount: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Habit", habitSchema);
