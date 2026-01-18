const HabitCompletion = require("../models/HabitCompletion");
const { getPeriodKey, getPreviousPeriodKey } = require("./periodService");

const calculateStreak = async (habitId, frequency) => {
  let streak = 0;

  // ✅ ALWAYS start from current period
  let currentKey = getPeriodKey(frequency);

  while (true) {
    const completion = await HabitCompletion.findOne({
      habitId,
      periodKey: currentKey
    });

    if (!completion) break;

    streak++;
    currentKey = getPreviousPeriodKey(frequency, currentKey);
  }

  return streak;
};

const getStreakHistory = async (habitId, frequency, limit = 7) => {
  const history = [];
  let currentKey = getPeriodKey(frequency);

  for (let i = 0; i < limit; i++) {
    const completed = await HabitCompletion.exists({
      habitId,
      periodKey: currentKey
    });

    history.unshift({
      period: currentKey,
      completed: Boolean(completed)
    });

    currentKey = getPreviousPeriodKey(frequency, currentKey);
  }

  return history;
};

module.exports = {
  calculateStreak,
  getStreakHistory
};
