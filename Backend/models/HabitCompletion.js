const mongoose = require("mongoose");

const completionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  habitId: { type: mongoose.Schema.Types.ObjectId, required: true },
  completedAt: { type: Date, default: Date.now },
  periodKey: { type: String, required: true }
});

completionSchema.index({ habitId: 1, periodKey: 1 }, { unique: true });

module.exports = mongoose.model("HabitCompletion", completionSchema);
