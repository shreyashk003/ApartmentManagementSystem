import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Information from "./Information";
import Contact from "./Contact";
import LoginPage from "./LoginPage";
import Test from "./Test";
import axios from "axios";

function Home({ setLoginStatus, setUserType, setOid, setUsername }) { // Added setUsername

const[apartmentName,setApartmentname]=useState('')

useEffect(()=>{
  axios.get("http://localhost:9000/api/getAptname")
  .then(response=>{
    setApartmentname(response.data[0].Apartmentname)
  })
  .catch(err=>{
    console.log(err)
  })
},[])
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-teal-600 to-blue-500 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-white text-2xl font-bold">{apartmentName} Apartment Management System</h1>
            <div className="space-x-6">
              <Link
                to="/home"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                About
              </Link>
              <Link
                to="/information"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Information
              </Link>
              <Link
                to="/contact"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            {/* Default route to Test component */}
            <Route path="/" element={<Test />} />
            <Route path="/home" element={<Test />} />
            <Route path="/about" element={<About />} />
            <Route path="/information" element={<Information />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setLoginStatus={setLoginStatus}
                  setUserType={setUserType}
                  setOid={setOid}
                  setUsername={setUsername} // Pass setUsername to LoginPage
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Home;
