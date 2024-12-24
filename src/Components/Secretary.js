import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Employee from "./Employee";
import MakeEmpSalary from "./MakeEmpSalary";
import RaiseDemand from "./RaiseDemand";
import Maintainancedues from "./Maintainancedues";

function AddExpense() {
  const [expense, setExpense] = useState({
    date: "",
    month:"",
    amount: "",
    description: "",
    status: "",
    modeOfPayment: "",
    personOrAgencyName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/addExpense", expense)
      .then(() => {
        alert("Expense added successfully!");
        setExpense({
          date: "",
          month:"",
          amount: "",
          description: "",
          status: "",
          modeOfPayment: "",
          personOrAgencyName: "",
        }); // Clear inputs
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
        alert("Failed to add expense. Please try again.");
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 rounded-xl shadow-2xl">
      <h2 className="text-gray-100 text-2xl font-semibold mb-6 text-center">Add Expense</h2>
      <form className="space-y-5" onSubmit={handleAddExpense}>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Expense Date</label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>
        <div className="flex flex-col">
  <label className="text-gray-400 mb-2">Expense Month</label>
  <select
    name="month"
    value={expense.month}
    onChange={handleInputChange}
    className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
  >
    <option value="" disabled>
      Select a month
    </option>
    <option value="January">January</option>
    <option value="February">February</option>
    <option value="March">March</option>
    <option value="April">April</option>
    <option value="May">May</option>
    <option value="June">June</option>
    <option value="July">July</option>
    <option value="August">August</option>
    <option value="September">September</option>
    <option value="October">October</option>
    <option value="November">November</option>
    <option value="December">December</option>
  </select>
</div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Expense Amount</label>
          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Description</label>
          <select
            name="description"
            value={expense.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          >
            <option value="" disabled>
              Select an expense type
            </option>
            <option value="electricity_bill">Electricity Bill</option>
            <option value="water_bill">Water Bill</option>
            <option value="plumbing_charges">Plumbing Charges</option>
            <option value="electrician_charges">Electrician Charges</option>
            <option value="water_supplier_charges">Water Supplier Charges</option>
            <option value="lift_maintenance_charges">Lift Maintenance Charges</option>
            <option value="tank_cleaning_charges">Tank Cleaning Charges</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Status</label>
          <input
            type="text"
            name="status"
            value={expense.status}
            onChange={handleInputChange}
            placeholder="e.g., Paid, Pending"
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Mode of Payment</label>
          <input
            type="text"
            name="modeOfPayment"
            value={expense.modeOfPayment}
            onChange={handleInputChange}
            placeholder="e.g., Cash, Card"
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Person/Agency Name</label>
          <input
            type="text"
            name="personOrAgencyName"
            value={expense.personOrAgencyName}
            onChange={handleInputChange}
            placeholder="Name of person or agency"
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

function SendReminder() {
  const [reminder, setReminder] = useState({
    oid: "",
    reminder: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReminder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendReminder = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/sendReminder", reminder)
      .then(() => {
        alert("Reminder sent successfully!");
        setReminder({ oid: "", reminder: "" }); // Clear inputs
      })
      .catch((err) => {
        console.error("Error sending reminder:", err);
        alert("Failed to send reminder. Please try again.");
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 rounded-xl shadow-2xl">
      <h2 className="text-gray-100 text-2xl font-semibold mb-6 text-center">Send Reminder</h2>
      <form className="space-y-5" onSubmit={handleSendReminder}>
        <div className="flex flex-col col-span-2">
          <label className="text-gray-400 mb-2">Owners ID</label>
          <input
            type="text"
            name="oid"
            value={reminder.oid}
            onChange={handleInputChange}
            placeholder="Enter OID"
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Reminder Message</label>
          <textarea
            name="reminder"
            value={reminder.reminder}
            onChange={handleInputChange}
            placeholder="Type your reminder message here"
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
        >
          Send Reminder
        </button>
      </form>
    </div>
  );
}

function Secretary() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen font-poppins">
        <nav className="p-4 bg-gray-900 shadow-lg">
          <ul className="flex space-x-6 justify-center text-lg font-medium">
            <li>
              <Link
                to="/add-expense"
                className="text-purple-400 hover:text-purple-500 transition duration-300"
              >
                Add Expense
              </Link>
            </li>
            <li>
              <Link
                to="/send-reminder"
                className="text-teal-400 hover:text-teal-500 transition duration-300"
              >
                Send Reminder
              </Link>
            </li>
            <li>
              <Link
                to="/make-salary"
                className="text-teal-400 hover:text-teal-500 transition duration-300"
              >
                Make Salary
              </Link>
            </li>

            <li>
              <Link
                to="/raise-mdemand"
                className="text-teal-400 hover:text-teal-500 transition duration-300"
              >
                Raise Maintenance Demand
              </Link>
            </li>


            <li>
              <Link
                to="/View-Dues"
                className="text-teal-400 hover:text-teal-500 transition duration-300"
              >
              ViewMaintainanceDues
              </Link>
            </li>

          </ul>
        </nav>
        <div className="p-10">
          <Routes>
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/send-reminder" element={<SendReminder />} />
            <Route path="/raise-mdemand" element={<RaiseDemand />} />
            <Route path="/View-Dues" element={<Maintainancedues />} />


            <Route
              path="/make-salary"
              element={
                <div className="flex gap-10">
                  <div className="flex-1">
                    <Employee />
                  </div>
                  <div className="flex-1">
                    <MakeEmpSalary />
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Secretary;
