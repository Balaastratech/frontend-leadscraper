// src/components/charts/ClusterVisualizer.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClusterVisualizer({ clusters = [] }) {
  const data = {
    labels: clusters.map((c) => c.label),
    datasets: [
      {
        data: clusters.map((c) => c.size),
        backgroundColor: clusters.map((c) => c.color || getRandomColor())
      }
    ]
  };

  return <Pie data={data} />;
}

function getRandomColor() {
  const palette = ["#6366F1", "#F97316", "#10B981", "#EF4444", "#8B5CF6"];
  return palette[Math.floor(Math.random() * palette.length)];
}
