import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";

import HabitCard from "../components/HabitCard";
import AnalyticsChart from "../components/AnalyticsChart";
import ChatbotPanel from "../components/ChatbotPanel";
import ReminderPanel from "../components/ReminderPanel";
import AddHabitForm from "../components/AddHabitForm";

import { getHabits, getAnalytics } from "../services/api";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  /* ---------------- Fetch Habits ---------------- */
  const fetchHabits = () => {
    getHabits()
      .then(res => setHabits(res.data))
      .catch(err => console.error("Habits error", err));
  };

  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    fetchHabits();

    getAnalytics()
      .then(res => setAnalytics(res.data))
      .catch(err => {
        console.error("Analytics error", err);
        setAnalytics(null);
      });
  }, []);

  /* ---------------- Chart Data ---------------- */
  const chartData =
    analytics?.weekly && analytics?.monthly
      ? [
          { name: "Weekly", value: analytics.weekly.completionRate },
          { name: "Monthly", value: analytics.monthly.completionRate }
        ]
      : [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Productivity Dashboard
      </Typography>

      {/* Add Habit */}
      <AddHabitForm onHabitAdded={fetchHabits} />
      
      <Grid container spacing={3}>
        {/* Habits */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            My Habits
          </Typography>

       <Grid container spacing={2}>
  {habits.map(habit => (
    <Grid item xs={12} md={6} key={habit._id}>
      <HabitCard
        habit={habit}
        onDelete={fetchHabits}
      />
    </Grid>
  ))}
</Grid>

        </Grid>

        {/* Analytics */}
        <Grid item xs={12} md={4}>
          <AnalyticsChart
            title="Completion Rate (%)"
            data={chartData}
          />
        </Grid>

        {/* Chatbot */}
        <Grid item xs={12}>
          <ChatbotPanel />
        </Grid>

        {/* Reminders */}
        <Grid item xs={12}>
          <ReminderPanel />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
