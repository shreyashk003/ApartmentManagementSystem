import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialExpenses = ({ expenseData }) => {
  const defaultData = {
    labels: ["January", "February", "March", "April", "May"], // Default labels
    datasets: [
      {
        label: "Expenses",
        data: [200, 300, 150, 400, 250], // Default dataset
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const data = expenseData || defaultData; // Use provided data or fallback to default

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4B5563", // Tailwind gray-600
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Financial Overview",
        font: {
          size: 18,
        },
        color: "#1F2937", // Tailwind gray-800
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6B7280", // Tailwind gray-500
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB", // Tailwind gray-200
        },
      },
      y: {
        ticks: {
          color: "#6B7280", // Tailwind gray-500
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB", // Tailwind gray-200
        },
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-6 rounded-xl shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4 text-center">
        Financial Expenses
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default FinancialExpenses;
