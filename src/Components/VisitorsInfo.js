import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function VisitorsInfo() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [visitorCount, setVisitorCount] = useState([]);

  const fetchVisitorCount = async () => {
    try {
      const payload = { year, month };
      const response = await axios.post(
        "http://localhost:9000/api/visitor-count",
        payload
      );

      if (response.data.success) {
        setVisitorCount(response.data.data);
      } else {
        alert("Error fetching visitor count");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching visitor count.");
    }
  };

  // Prepare data for the Bar Chart
  const chartData = {
    labels: visitorCount.map((item) => item.date), // Dates as labels
    datasets: [
      {
        label: "Number of Visitors",
        data: visitorCount.map((item) => item.count), // Visitor counts
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF", // White text on dark background
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF", // White text on dark background
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          Visitor Count
        </h1>

        {/* Year Dropdown */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-200 mb-1"
          >
            Select Year
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Year
            </option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        {/* Month Dropdown */}
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-200 mb-1"
          >
            Select Month
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Month
            </option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Fetch Visitor Count Button */}
        <button
          onClick={fetchVisitorCount}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Fetch Visitor Count
        </button>

        {/* Display Visitor Count in Bar Chart */}
        {visitorCount.length > 0 ? (
          <div className="bg-gray-700 p-4 rounded-md">
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-gray-400 text-center">No data to display</p>
        )}
      </div>
    </div>
  );
}

export default VisitorsInfo;
