import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box
} from "@mui/material";
import { completeHabit, deleteHabit } from "../services/api";

const HabitCard = ({ habit, onDelete }) => {
  const handleComplete = async () => {
    try {
      await completeHabit(habit._id);
      onDelete(); // refresh habits list
    } catch (err) {
      console.error("Completion error", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${habit.title}"?`)) return;

    try {
      await deleteHabit(habit._id);
      onDelete();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {habit.title}
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 0.5 }}>
          Frequency: {habit.frequency}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
          🔥 Streak: {habit.streak ?? 0}
        </Typography>

        {habit.isCompleted && (
          <Chip
            label="Completed for this period"
            color="success"
            size="small"
            sx={{ mb: 1 }}
          />
        )}

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleComplete}
            disabled={habit.isCompleted}
            color={habit.isCompleted ? "success" : "primary"}
          >
            {habit.isCompleted ? "Task Completed" : "Mark Complete"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
