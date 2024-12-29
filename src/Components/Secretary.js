import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { Home, DollarSign, Bell, Plus, FileText, Eye } from "lucide-react";
import Employee from "./Employee";
import MakeEmpSalary from "./MakeEmpSalary";
import RaiseDemand from "./RaiseDemand";
import Maintainancedues from "./Maintainancedues";
import axios from "axios";
import AddNewExpense from "./AddNewExpense";
import Addemployee from "./Addemployee";

function AddExpense() {
  const [description, setDescription] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [expense, setExpense] = useState({
    date: "",
    month: "",
    amount: "",
    description: "",
    status: "",
    modeOfPayment: "",
    personOrAgencyName: "",
  });

  useEffect(() => {
    axios.get("http://localhost:9000/api/getDescription")
      .then(response => {
        setDescription(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "Others")
      setVisible(true);
    else
      setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    axios.post("http://localhost:9000/api/addExpense", expense)
      .then(() => {
        alert("Expense added successfully!");
        setExpense({
          date: "",
          month: "",
          amount: "",
          description: "",
          status: "",
          modeOfPayment: "",
          personOrAgencyName: "",
        });
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
        alert("Failed to add expense. Please try again.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#112240] rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Add New Expense</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleAddExpense}>
          {[
            { label: "Date", name: "date", type: "date" },
            {
              label: "Month",
              name: "month",
              type: "select",
              options: ["January", "February", "March", "April", "May", "June", "July", 
                       "August", "September", "October", "November", "December"]
            },
            { label: "Amount", name: "amount", type: "number", placeholder: "Enter amount" },
            {
              label: "Description",
              name: "description",
              type: "select",
              options: description.map(D => D.Description)
            },
            {
              label: "Status",
              name: "status",
              type: "select",
              options: ["Paid", "Pending"]
            },
            {
              label: "Payment Mode",
              name: "modeOfPayment",
              type: "select",
              options: ["Cash", "Card", "UPI", "Bank Transfer"]
            },
            {
              label: "Person/Agency Name",
              name: "personOrAgencyName",
              type: "text",
              placeholder: "Enter name",
              fullWidth: true
            }
          ].map((field) => (
            <div key={field.name} className={`space-y-2 ${field.fullWidth ? "col-span-2" : ""}`}>
              <label className="text-sm font-medium text-gray-300">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={expense[field.name]}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#234] bg-[#172a45] text-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={expense[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-[#234] bg-[#172a45] text-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>
      {isVisible && <AddNewExpense />}
    </div>
  );
}

function SendReminder() {
  const [reminder, setReminder] = useState({ oid: "", reminder: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReminder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendReminder = (event) => {
    event.preventDefault();
    axios.post("http://localhost:9000/api/sendReminder", reminder)
      .then(() => {
        alert("Reminder sent successfully!");
        setReminder({ oid: "", reminder: "" });
      })
      .catch((err) => {
        console.error("Error sending reminder:", err);
        alert("Failed to send reminder. Please try again.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#112240] rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Send Reminder</h2>
        <form className="space-y-6" onSubmit={handleSendReminder}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Owner's ID</label>
            <input
              type="text"
              name="oid"
              value={reminder.oid}
              onChange={handleInputChange}
              placeholder="Enter Owner ID"
              className="w-full rounded-lg border border-[#234] bg-[#172a45] text-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Message</label>
            <textarea
              name="reminder"
              value={reminder.reminder}
              onChange={handleInputChange}
              placeholder="Type your reminder message"
              rows="4"
              className="w-full rounded-lg border border-[#234] bg-[#172a45] text-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
          >
            Send Reminder
          </button>
        </form>
      </div>
    </div>
  );
}

function NavLink({ to, children, icon: Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-300 hover:bg-[#172a45]'
        }`}
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );
}

function Secretary() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a192f]">
        <nav className="fixed w-64 h-full bg-[#112240] shadow-xl">
          <div className="flex flex-col h-full">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-blue-400">Dashboard</h1>
            </div>
            <div className="flex-1 px-4 space-y-2">
              <NavLink to="/add-expense" icon={Plus}>Add Expense</NavLink>
              <NavLink to="/send-reminder" icon={Bell}>Send Reminder</NavLink>
              <NavLink to="/add-employee" icon={Plus}>Add Employee</NavLink>
              <NavLink to="/make-salary" icon={DollarSign}>Make Salary</NavLink>
              <NavLink to="/raise-mdemand" icon={FileText}>Raise Demand</NavLink>
              <NavLink to="/View-Dues" icon={Eye}>View Dues</NavLink>
            </div>
          </div>
        </nav>
        
        <main className="ml-64 p-8">
          <Routes>
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/send-reminder" element={<SendReminder />} />
            <Route path="/raise-mdemand" element={<RaiseDemand />} />
            <Route path="/View-Dues" element={<Maintainancedues />} />
            <Route path="/add-employee" element={<Addemployee/>} />

            <Route
              path="/make-salary"
              element={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <MakeEmpSalary />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default Secretary;