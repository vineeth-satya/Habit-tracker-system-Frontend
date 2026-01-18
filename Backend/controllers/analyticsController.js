const {
  getWeeklyAnalytics,
  getMonthlyAnalytics
} = require("../services/analyticsService");

exports.getAnalytics = async (req, res) => {
  const weekly = await getWeeklyAnalytics(req.user.id);
  const monthly = await getMonthlyAnalytics(req.user.id);

  res.json({ weekly, monthly });
};
