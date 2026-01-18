const Habit = require("../models/Habit");
const HabitCompletion = require("../models/HabitCompletion");
const { getPeriodKey } = require("../services/periodService");
const {
  calculateStreak,
  getStreakHistory
} = require("../services/streakService");

/**
 * Create a new habit
 */
exports.createHabit = async (req, res) => {
  const habit = await Habit.create({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
    frequency: req.body.frequency,
    targetCount: req.body.targetCount || 1
  });

  res.status(201).json(habit);
};

/**
 * Mark habit as completed (period-based)
 */
exports.completeHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.habitId);

  if (!habit || !habit.isActive) {
    return res.status(404).json({ message: "Habit not found" });
  }

  const periodKey = getPeriodKey(habit.frequency);

  try {
    const completion = await HabitCompletion.create({
      userId: req.user.id,
      habitId: habit._id,
      periodKey
    });

    res.json({ message: "Habit completed", completion });
  } catch (err) {
    res.status(400).json({
      message: "Habit already completed for this period"
    });
  }
};

/**
 * Get all active habits for logged-in user
 */
exports.getHabits = async (req, res) => {
  const habits = await Habit.find({
    userId: req.user.id,
    isActive: true
  });

  const enrichedHabits = await Promise.all(
    habits.map(async habit => {
      // 1️⃣ Current period key
      const periodKey = getPeriodKey(habit.frequency);

      // 2️⃣ Check completion for current period
      const completed = await HabitCompletion.exists({
        habitId: habit._id,
        periodKey
      });

      // 3️⃣ Calculate streak
      const streak = await calculateStreak(
        habit._id,
        habit.frequency
      );

      // 4️⃣ Streak history (for charts)
      const history = await getStreakHistory(
        habit._id,
        habit.frequency
      );

      return {
        ...habit.toObject(),
        streak,
        history,
        isCompleted: Boolean(completed) // ✅ FIXED
      };
    })
  );

  res.json(enrichedHabits);
};

/**
 * Delete a habit (soft delete)
 */
exports.deleteHabit = async (req, res) => {
  const habit = await Habit.findOne({
    _id: req.params.habitId,
    userId: req.user.id
  });

  if (!habit) {
    return res.status(404).json({ message: "Habit not found" });
  }

  habit.isActive = false;
  await habit.save();

  res.json({ message: "Habit deleted successfully" });
};
