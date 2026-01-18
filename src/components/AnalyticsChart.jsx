import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const AnalyticsChart = ({ title, data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>

        {/* Numeric summary */}
        <Box sx={{ mt: 2 }}>
          {data.map(item => (
            <Typography
              key={item.name}
              variant="body2"
              color="text.secondary"
            >
              {item.name}: {item.value}%
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
