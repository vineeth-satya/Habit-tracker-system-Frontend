import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";

const ChatbotPanel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input }
      );

      setMessages(prev => [
        ...prev,
        { role: "user", text: input },
        { role: "ai", text: res.data.reply }
      ]);

      setInput("");
    } catch (err) {
      console.error("Chat error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        AI Habit Coach
      </Typography>

      <Box sx={{ maxHeight: 220, overflowY: "auto", mb: 2 }}>
        {messages.map((m, i) => (
          <Typography key={i} sx={{ mb: 1 }}>
            <strong>{m.role === "ai" ? "Coach" : "You"}:</strong>{" "}
            {m.text}
          </Typography>
        ))}
      </Box>

      <TextField
        fullWidth
        placeholder="Ask for advice..."
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
      />

      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </Button>
    </Paper>
  );
};

export default ChatbotPanel;
