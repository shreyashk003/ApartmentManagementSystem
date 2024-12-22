import React, { useState, useEffect } from "react";
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
import axios from "axios";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialExpenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [monthWiseData, setMonthWiseData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/getsummaryexpenses")
      .then((response) => setExpenseData(response.data || []))
      .catch((error) => console.error("Error fetching summary expenses:", error));
  }, [monthWiseData]);

  const fetchMonthWiseExpenses = () => {
    if (!selectedDescription) {
      alert("Please select a description.");
      return;
    }

    const payload = { description: selectedDescription, year: selectedYear };

    axios
      .post("http://localhost:9000/api/getmonthwiseexpenses", payload)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) setMonthWiseData(data);
        else alert("Error: Unable to load month-wise data.");
      })
      .catch(() => alert("Failed to fetch month-wise expenses."));
  };

  const overallChartData = {
    labels: expenseData.map((item) => item._id || "Unknown"),
    datasets: [
      {
        label: "Total Expenses",
        data: expenseData.map((item) => item.total || 0),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(67, 56, 202, 1)",
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const monthWiseChartData = {
    labels: monthWiseData
      ? monthWiseData.map((item) =>
          ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][
            item.month - 1
          ] || "Unknown"
        )
      : [],
    datasets: [
      {
        label: `Expenses for ${selectedDescription}`,
        data: monthWiseData ? monthWiseData.map((item) => item.totalAmount || 0) : [],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(5, 150, 105, 1)",
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Financial Overview", font: { size: 18 } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(209, 213, 219, 0.2)" } },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-indigo-200 py-20">
      <div className="max-w-12xl mx-auto px-16 py-10 bg-white shadow-2xl rounded-xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-indigo-800 text-center mb-20">
          📊 Financial Expenses Dashboard
        </h1>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Overall Financial Chart Box */}
          <div className="p-10 bg-gradient-to-r from-indigo-100 to-indigo-300 shadow-lg rounded-lg border border-indigo-400">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Overall Financial Summary</h2>
            <div className="h-96">
              {expenseData.length > 0 ? (
                <Bar data={overallChartData} options={chartOptions} />
              ) : (
                <p className="text-center text-gray-500 text-xl">Loading overall expense data...</p>
              )}
            </div>
          </div>

          {/* Month-Wise Financial Chart Box */}
          <div className="p-10 bg-gradient-to-r from-green-100 to-green-300 shadow-lg rounded-lg border border-green-400">
            <h2 className="text-3xl font-bold text-green-700 mb-6">Month-Wise Expenses</h2>
            <div className="h-96">
              {monthWiseData ? (
                <Bar data={monthWiseChartData} options={chartOptions} />
              ) : (
                <p className="text-center text-gray-500 text-xl">
                  {selectedDescription
                    ? "Loading month-wise data for the selected description..."
                    : "Select a description to view month-wise data."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
            Filter Month-Wise Expenses
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            {/* Dropdown for Expense Description */}
            <select
              value={selectedDescription}
              onChange={(e) => setSelectedDescription(e.target.value)}
              className="w-64 px-4 py-3 bg-white border rounded-lg shadow focus:outline-none"
            >
              <option value="" disabled>
                Select a description
              </option>
              <option value="electricity_bill">Electricity Bill</option>
              <option value="water_bill">Water Bill</option>
              <option value="plumbing_charges">Plumbing Charges</option>
              <option value="electrician_charges">Electrician Charges</option>
              <option value="lift_maintenance_charges">Lift Maintenance Charges</option>
              <option value="others">Others</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-64 px-4 py-3 bg-white border rounded-lg shadow focus:outline-none"
            >
              <option value="" disabled>
                Select a Year
              </option>
              {Array.from({ length: 2035 - 2024 + 1 }, (_, i) => 2024 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Button for Fetching Data */}
            <button
              onClick={fetchMonthWiseExpenses}
              className="px-12 py-3 bg-blue-500 text-white text-xl rounded-lg shadow hover:bg-blue-600"
            >
              Get Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialExpenses;
