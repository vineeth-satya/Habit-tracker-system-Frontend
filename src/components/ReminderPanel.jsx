import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import axios from "axios";

const ReminderPanel = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reminders")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6">Reminders</Typography>

        <List>
          {data.reminders.map((r, i) => (
            <ListItem key={i}>
              🔔 {r.message}
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Suggestions
        </Typography>

        <List>
          {data.suggestions.map((s, i) => (
            <ListItem key={i}>
              💡 {s.suggestion}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ReminderPanel;
