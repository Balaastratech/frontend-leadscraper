// src/components/charts/ScoreDistributionChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

export default function ScoreDistributionChart({ scores = [] }) {
  const labels = scores.map((_, i) => `Bucket ${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: "Score",
        data: scores,
        backgroundColor: "rgba(99,102,241,0.72)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true, suggestedMax: 100 }
    }
  };

  return <Bar data={data} options={options} />;
}
