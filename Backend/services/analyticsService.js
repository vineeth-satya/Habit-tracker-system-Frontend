const Habit = require("../models/Habit");
const HabitCompletion = require("../models/HabitCompletion");
const { getPeriodKey } = require("./periodService");

const getWeeklyAnalytics = async (userId) => {
  const habits = await Habit.find({ userId, isActive: true });
  const currentWeek = getPeriodKey("weekly");

  let completed = 0;

  for (const habit of habits) {
    const completion = await HabitCompletion.findOne({
      habitId: habit._id,
      periodKey: currentWeek
    });
    if (completion) completed++;
  }

  return {
    totalHabits: habits.length,
    completedHabits: completed,
    completionRate: habits.length
      ? Math.round((completed / habits.length) * 100)
      : 0
  };
};

const getMonthlyAnalytics = async (userId) => {
  const habits = await Habit.find({ userId, isActive: true });
  const currentMonth = getPeriodKey("monthly");

  let completed = 0;

  for (const habit of habits) {
    const completion = await HabitCompletion.findOne({
      habitId: habit._id,
      periodKey: currentMonth
    });
    if (completion) completed++;
  }

  return {
    month: currentMonth,
    completionRate: habits.length
      ? Math.round((completed / habits.length) * 100)
      : 0
  };
};

module.exports = {
  getWeeklyAnalytics,
  getMonthlyAnalytics
};
