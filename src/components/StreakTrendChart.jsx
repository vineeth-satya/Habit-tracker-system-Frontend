import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Box, Typography } from "@mui/material";

const StreakTrendChart = ({ history }) => {
  const data = history.map((h, i) => ({
    name: `P${i + 1}`,
    value: h.completed ? i + 1 : 0
  }));

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" color="text.secondary">
        Streak Trend
      </Typography>

      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StreakTrendChart;
