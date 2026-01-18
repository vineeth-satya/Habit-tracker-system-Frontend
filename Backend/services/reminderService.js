const Habit = require("../models/Habit");
const HabitCompletion = require("../models/HabitCompletion");
const { getPeriodKey, getPreviousPeriodKey } = require("./periodService");

const getRemindersAndSuggestions = async (userId) => {
  const habits = await Habit.find({ userId, isActive: true });

  const reminders = [];
  const suggestions = [];

  for (const habit of habits) {
    const currentKey = getPeriodKey(habit.frequency);
    const previousKey = getPreviousPeriodKey(
      habit.frequency,
      currentKey
    );

    const completedCurrent = await HabitCompletion.exists({
      habitId: habit._id,
      periodKey: currentKey
    });

    const completedPrevious = await HabitCompletion.exists({
      habitId: habit._id,
      periodKey: previousKey
    });

    /* ---------- REMINDER LOGIC ---------- */
    if (!completedCurrent) {
      reminders.push({
        habitId: habit._id,
        title: habit.title,
        message: `You haven’t completed "${habit.title}" for this ${habit.frequency} period.`
      });
    }

    /* ---------- SUGGESTION LOGIC ---------- */
    if (!completedPrevious && completedCurrent === false) {
      suggestions.push({
        habitId: habit._id,
        suggestion: `Try reducing effort for "${habit.title}" to rebuild consistency.`
      });
    }

    if (habit.frequency === "daily" && completedPrevious && !completedCurrent) {
      suggestions.push({
        habitId: habit._id,
        suggestion: `You had a good streak on "${habit.title}". A small action today keeps it alive.`
      });
    }
  }

  // 🔧 DEVELOPMENT FALLBACK (REMOVE BEFORE FINAL SUBMISSION)
if (reminders.length === 0 && suggestions.length === 0) {
  reminders.push({
    habitId: null,
    title: "Demo Reminder",
    message: "You have habits pending today. Try completing at least one."
  });

  suggestions.push({
    habitId: null,
    suggestion: "Start with a small action to maintain consistency."
  });
}


  return { reminders, suggestions };
};

module.exports = { getRemindersAndSuggestions };
