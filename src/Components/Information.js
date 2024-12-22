import React, { useState, useEffect } from "react";
import axios from "axios";

function Information() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/getinfo")
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col justify-between">
      <header className="bg-teal-600 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-white text-2xl font-bold">Apartment Insights</h1>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-extrabold text-teal-600 text-center mb-6">
            Apartment Information
          </h1>
          <p className="text-gray-700 text-center mb-8">
            Explore comprehensive details about your apartment management system.
          </p>

          {info.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {info.map((apartment) => (
                <div
                  key={apartment._id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-transform"
                >
                  <h2 className="text-xl font-bold text-teal-600 mb-2">
                    {apartment.Apartmentname}
                  </h2>
                  <p className="text-gray-600 mb-1">
                    <strong>Address:</strong> {apartment.Address}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Area Name:</strong> {apartment.AreaName}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>City:</strong> {apartment.City}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Builder:</strong> {apartment.Buildername}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Number of Wings:</strong> {apartment.NumberOfWings}
                  </p>
                  <p className="text-gray-600">
                    <strong>Society Name:</strong> {apartment.SocietyName}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-12">
              <p className="text-gray-600 text-lg">Loading apartment data...</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Apartment Management System. All Rights Reserved.
          </p>
          <p className="text-sm mt-2">
            Built with <span className="text-red-500">❤️</span> for seamless apartment living.
          </p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Information;
