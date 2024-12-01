import React, { useState } from 'react';

function MakeEmpSalary() {
  const [salaryData, setSalaryData] = useState({
    amount: "",
    month: "",
    year: "",
    date: "",
    salaryStatus: "pending", // default salary status
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData({ ...salaryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      // Logic for submitting data
      // Example: Make API request or other handling
      // const response = await axios.post("/api/salary", salaryData);

      setMessage("Salary details added successfully!");
      setSalaryData({
        amount: "",
        month: "",
        year: "",
        date: "",
        salaryStatus: "pending",
      });
    } catch (error) {
      setMessage("Error adding salary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen py-10 px-5">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Add Salary Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="amount" className="block text-lg font-medium text-gray-300">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={salaryData.amount}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="month" className="block text-lg font-medium text-gray-300">Month:</label>
            <input
              type="text"
              id="month"
              name="month"
              value={salaryData.month}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year" className="block text-lg font-medium text-gray-300">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={salaryData.year}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date" className="block text-lg font-medium text-gray-300">Salary Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={salaryData.date}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salaryStatus" className="block text-lg font-medium text-gray-300">Salary Status:</label>
            <select
              id="salaryStatus"
              name="salaryStatus"
              value={salaryData.salaryStatus}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg font-semibold hover:bg-gradient-to-l transition duration-300"
          >
            {isLoading ? "Adding Salary..." : "Add Salary"}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default MakeEmpSalary;
