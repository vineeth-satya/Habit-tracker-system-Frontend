import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Typography
} from "@mui/material";
import axios from "axios";

const AddHabitForm = ({ onHabitAdded }) => {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/habits", {
        title,
        frequency
      });

      setTitle("");
      setFrequency("daily");

      // refresh habits list
      onHabitAdded();
    } catch (err) {
      console.error("Add habit error", err);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Habit
        </Typography>

        <TextField
          fullWidth
          label="Habit name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Frequency"
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </TextField>

        <Button variant="contained" onClick={handleSubmit}>
          Add Habit
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddHabitForm;
