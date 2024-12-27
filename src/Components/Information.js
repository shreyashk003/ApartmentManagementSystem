import React, { useState, useEffect } from "react";
import axios from "axios";

function Information() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/getinfo")
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col justify-between">
      

      <main className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-5xl p-6 bg-white shadow-xl rounded-lg">
          <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-6">
            Apartment Information
          </h1>
          <p className="text-gray-700 text-center mb-8">
            Explore comprehensive details about your apartment management system.
          </p>

          {loading ? (
            <div className="text-center mt-12">
              <p className="text-gray-600 text-lg">Loading apartment data...</p>
              <div className="mt-4 animate-pulse">
                <div className="w-24 h-6 bg-gray-300 rounded-full mx-auto"></div>
                <div className="w-32 h-6 bg-gray-300 rounded-full mx-auto mt-2"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {info.map((apartment) => (
                <div
                  key={apartment._id}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-all"
                >
                  <h2 className="text-2xl font-bold text-teal-600 mb-2">
                    {apartment.Apartmentname}
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Address:</strong> {apartment.Address}
                    </p>
                    <p className="text-gray-600">
                      <strong>Area Name:</strong> {apartment.AreaName}
                    </p>
                    <p className="text-gray-600">
                      <strong>City:</strong> {apartment.City}
                    </p>
                    <p className="text-gray-600">
                      <strong>Builder:</strong> {apartment.Buildername}
                    </p>
                    <p className="text-gray-600">
                      <strong>Number of Wings:</strong> {apartment.NumberOfWings}
                    </p>
                    <p className="text-gray-600">
                      <strong>Society Name:</strong> {apartment.SocietyName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} jFork Technology Services Pvt.Ltd , All Rights Reserved.
          </p>
          <p className="text-sm mt-2">
            Built with <span className="text-red-500">❤️</span> for seamless apartment living.
          </p>
          <div className="mt-4 space-x-6">
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
