const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());           // ✅ ADD THIS
app.use(express.json());

app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/reminders", require("./routes/reminderRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
