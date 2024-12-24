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
  const [monthWiseData, setMonthWiseData] = useState(null); // Null for clear differentiation

  // Fetch overall summary expenses
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/getsummaryexpenses")
      .then((response) => {
        setExpenseData(response.data || []);
      })
      .catch((error) => console.error("Error fetching summary expenses:", error));
  }, [monthWiseData]);

  // Fetch month-wise expenses based on the selected description
  const fetchMonthWiseExpenses = () => {
    if (!selectedDescription) {
      alert("Please select a description.");
      return;
    }

    const payload={
      description:selectedDescription,
      year:selectedYear
    }

    axios.post("http://localhost:9000/api/getmonthwiseexpenses",payload )
      
      .then((response) => {
        const data = response.data;
        alert(data[0].month)

        if (Array.isArray(data)) {
          setMonthWiseData(data);
        } else {
          console.error("Unexpected response format for month-wise data:", data);
          alert("Error: Unable to load month-wise data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching month-wise expenses:", error);
        alert("Failed to fetch month-wise expenses.");
      });
  };

  // Data for the overall expenses chart
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

  // Data for the month-wise expenses chart
  const monthWiseChartData = {
    labels: monthWiseData ? monthWiseData.map((item) => item.month===1?"January":item.month===2?"Feburury":item.month===3?"Martch": 
    item.month===4?"April":item.month===5?"May":item.month===6?"June":item.month===7?"July":item.month===8?"August":
    item.month===9?"September":item.month===10?"October": item.month===11?"November": "December"   || "Unknown") : [],
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-indigo-200 py-10">
      <div className="max-w-7xl mx-auto p-10 bg-white shadow-2xl rounded-xl border border-gray-200">
        <h1 className="text-5xl font-extrabold text-indigo-800 text-center mb-12">
          📊 Financial Expenses Dashboard
        </h1>

        {/* Overall Financial Chart */}
        <div className="h-96 mb-12">
          {expenseData.length > 0 ? (
            <Bar data={overallChartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-500 text-lg">Loading overall expense data...</p>
          )}
        </div>

        {/* Filter Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Filter Month-Wise Expenses
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Dropdown for Expense Description */}
            <select
              value={selectedDescription}
              onChange={(e) => setSelectedDescription(e.target.value)}
              className="px-4 py-3 bg-white border rounded-lg shadow focus:outline-none"
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

            <select value={selectedYear}
              onChange={(e)=>setSelectedYear(e.target.value)}
              className="px-4 py-3 bg-white border rounded-lg shadow focus:outline-none"

            >
  <option value="" disabled>Select a Year</option>
  <option value="2024">2024</option>
  <option value="2025">2025</option>
  <option value="2026">2026</option>
  <option value="2027">2027</option>
  <option value="2028">2028</option>
  <option value="2029">2029</option>
  <option value="2030">2030</option>
  <option value="2031">2031</option>
  <option value="2032">2032</option>
  <option value="2033">2033</option>
  <option value="2034">2034</option>
  <option value="2035">2035</option>
</select>


            {/* Button for Fetching Data */}
            <button
              onClick={fetchMonthWiseExpenses}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Get Data
            </button>
          </div>
        </div>

        {/* Month-Wise Financial Chart */}
        <div className="h-96 mt-12">
          {monthWiseData ? (
            <Bar data={monthWiseChartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-500 text-lg">
              {selectedDescription
                ? "Loading month-wise data for the selected description..."
                : "Select a description to view month-wise data."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialExpenses;