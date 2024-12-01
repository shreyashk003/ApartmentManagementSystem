import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddFlatOwner from './AddFlatOwner';
import AddFlatDetails from './AddFlatDetails';
import UpdateFlatOwner from './UpdateFlatOwner';
import FinancialExpenses from './FinancialExpenses';

function AdminDashboard() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Admin Dashboard</h1>

        {/* Navbar */}
        <nav className="bg-gradient-to-r from-teal-500 to-blue-600 shadow-md rounded-md mb-8">
          <div className="max-w-4xl mx-auto p-4 flex justify-around">
            <Link
              to="/add-flat-owner"
              className="text-white font-semibold hover:text-gray-200 transition-colors"
            >
              Add Flat Owner
            </Link>
            <Link
              to="/add-flat-details"
              className="text-white font-semibold hover:text-gray-200 transition-colors"
            >
              Add Flat Details
            </Link>
            <Link
              to="/update-flat-owner"
              className="text-white font-semibold hover:text-gray-200 transition-colors"
            >
              Update Flat Owner
            </Link>
            <Link
              to="/financial-expenses"
              className="text-white font-semibold hover:text-gray-200 transition-colors"
            >
              Financial Expenses
            </Link>
          </div>
        </nav>
        

        {/* Routes */}
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/add-flat-owner" element={<AddFlatOwner />} />
            <Route path="/add-flat-details" element={<AddFlatDetails />} />
            <Route path="/update-flat-owner" element={<UpdateFlatOwner />} />
            <Route path="/financial-expenses" element={<FinancialExpenses />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Wrappers for the components (mock props can be replaced with actual logic)


export default AdminDashboard;
