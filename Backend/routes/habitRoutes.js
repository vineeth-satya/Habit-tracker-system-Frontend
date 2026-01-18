const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createHabit,
  getHabits,
  completeHabit,
  deleteHabit
} = require("../controllers/habitController");

router.post("/", auth, createHabit);
router.get("/", auth, getHabits);
router.post("/:habitId/complete", auth, completeHabit);
router.delete("/:habitId", auth, deleteHabit);


module.exports = router;
