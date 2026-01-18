const express = require("express");
const router = express.Router();
// auth can be added later
const { getRemindersAndSuggestions } =
  require("../services/reminderService");

router.get("/", async (req, res) => {
  // TEMP: no JWT yet
  const userId = null;

  const data = await getRemindersAndSuggestions(userId);
  res.json(data);
});

module.exports = router;
