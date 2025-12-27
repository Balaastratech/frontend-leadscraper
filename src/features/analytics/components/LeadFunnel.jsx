// src/components/dashboard/LeadFunnel.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

/**
 * LeadFunnel
 * - pipeline: { new, contacted, qualified, won, lost }
 */
export default function LeadFunnel({ pipeline = {} }) {
  const labels = ["New", "Contacted", "Qualified", "Won"];
  const data = {
    labels,
    datasets: [
      {
        label: "Leads",
        data: [pipeline.new || 0, pipeline.contacted || 0, pipeline.qualified || 0, pipeline.won || 0],
        backgroundColor: ["#60A5FA", "#A78BFA", "#34D399", "#F59E0B"]
      }
    ]
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true } }
  };

  return <Bar data={data} options={options} />;
}