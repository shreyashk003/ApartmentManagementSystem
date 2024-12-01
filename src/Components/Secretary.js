import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Employee from "./Employee";
import MakeEmpSalary from "./MakeEmpSalary";

function AddExpense() {
  const [expense, setExpense] = useState({
    date: "",
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
        {[  
          { label: "Expense Date", name: "date", type: "date" },
          { label: "Expense Amount", name: "amount", type: "number", placeholder: "Enter amount" },
          { label: "Description", name: "description", type: "text", placeholder: "Describe the expense" },
          { label: "Status", name: "status", type: "text", placeholder: "e.g., Paid, Pending" },
          { label: "Mode of Payment", name: "modeOfPayment", type: "text", placeholder: "e.g., Cash, Card" },
          { label: "Person/Agency Name", name: "personOrAgencyName", type: "text", placeholder: "Name of person or agency" },
        ].map(({ label, name, type, placeholder }) => (
          <div className="flex flex-col" key={name}>
            <label className="text-gray-400 mb-2">{label}</label>
            <input
              type={type}
              name={name}
              value={expense[name]}
              onChange={handleInputChange}
              placeholder={placeholder || ""}
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>
        ))}
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
          </ul>
        </nav>
        <div className="p-10">
          <Routes>
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/send-reminder" element={<SendReminder />} />
            <Route
  path="/make-salary"
  element={
    <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
      <div style={{ flex: 1, maxWidth: "650px" }}>
        <Employee />
      </div>
      <div style={{ flex: 1, maxWidth: "650px" }}>
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
