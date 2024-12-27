import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Users, Building, RefreshCw, DollarSign, Settings, Menu, X } from 'lucide-react';
import AddFlatOwner from './AddFlatOwner';
import AddFlatDetails from './AddFlatDetails';
import UpdateFlatOwner from './UpdateFlatOwner';
import FinancialExpenses from './FinancialExpenses';
import Apartment from './Apartment';

const NavLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-white bg-opacity-20 text-white shadow-lg' 
          : 'text-white/80 hover:bg-white hover:bg-opacity-10'
      }`}
    >
      <Icon size={20} />
      <span className="hidden md:inline">{children}</span>
    </Link>
  );
};

function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 to-blue-800
          transition-all duration-300 shadow-xl z-50
          ${isMobileMenuOpen ? 'w-64' : 'w-16 md:w-64'}
        `}>
          {/* Logo Area */}
          <div className="p-4 flex items-center justify-between border-b border-blue-500">
            <h2 className={`text-white font-bold ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
              Admin Portal
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            <NavLink to="/" icon={Home}>Dashboard Home</NavLink>
            <NavLink to="/add-flat-owner" icon={Users}>Add Flat Owner</NavLink>
            <NavLink to="/add-flat-details" icon={Building}>Add Flat Details</NavLink>
            <NavLink to="/add-apartment-details" icon={Building}>Add Apartment Details</NavLink>
            <NavLink to="/update-flat-owner" icon={RefreshCw}>Update Flat Owner</NavLink>
            <NavLink to="/financial-expenses" icon={DollarSign}>Financial Expenses</NavLink>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className={`transition-all duration-300 ${isMobileMenuOpen ? 'ml-64' : 'ml-16 md:ml-64'}`}>
          <header className="bg-white shadow-md">
            <div className="mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Settings size={20} className="text-gray-600" />
                  </button>
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    A
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
              <Routes>
                <Route path="/" element={
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-bold text-gray-700">Welcome to the Admin Dashboard</h2>
                    <p className="text-gray-500 mt-2">Select an option from the sidebar to get started</p>
                  </div>
                } />
                <Route path="/add-flat-owner" element={<AddFlatOwner />} />
                <Route path="/add-flat-details" element={<AddFlatDetails />} />
                <Route path="/update-flat-owner" element={<UpdateFlatOwner />} />
                <Route path="/financial-expenses" element={<FinancialExpenses />} />
                <Route path="/add-apartment-details" element={<Apartment />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default AdminDashboard;