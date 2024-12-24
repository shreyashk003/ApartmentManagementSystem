import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimes, FaSpinner } from 'react-icons/fa'; // Import check and cross icons

function Maintainancedues() {
  const [maintainancedues, setMaintainancedues] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2024'); // Default selected year
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the data whenever selectedYear changes
  useEffect(() => {
    setLoading(true); // Set loading to true while fetching data
    axios
      .get(`http://localhost:9000/api/getDues/${selectedYear}`)
      .then((response) => {
        setMaintainancedues(response.data); // Update the state with the response data
      })
      .catch((err) => {
        console.log("Error fetching data:", err); // Log any errors
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data is fetched or error occurs
      });
  }, [selectedYear]); // This will run whenever selectedYear changes

  // Generate an array of years from 2024 to 2030
  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">Maintenance Dues</h2>

      {/* Dropdown to select year */}
      <div className="mb-6">
        <label htmlFor="year" className="block text-gray-300 font-medium mb-2">
          Select Year:
        </label>
        <select
          id="year"
          className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)} // Update the selected year on change
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center mb-6">
          <FaSpinner className="animate-spin text-2xl text-blue-500" />
        </div>
      )}

      {/* Table for displaying maintenance dues */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-700 text-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">First Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Last Name</th>
              <th className="px-6 py-3 text-right text-sm font-medium">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {maintainancedues.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            ) : (
              maintainancedues.map((Owner) =>
                Owner.Maintainance.map((M) => {
                  // Ensure we're only rendering rows for the selected year
                  if (M.year === selectedYear) {
                    return (
                      <tr
                        key={`${Owner.Afname}-${M.year}`}
                        className="border-b border-gray-600 hover:bg-gray-600 transition duration-200"
                      >
                        <td className="px-6 py-4 text-left text-sm">{Owner.Afname}</td>
                        <td className="px-6 py-4 text-left text-sm">{Owner.Alname}</td>
                        <td className="px-6 py-4 text-right text-sm">{M.amount}</td>
                        <td className="px-6 py-4 text-sm">
                          {M.status === 'Pending' ? (
                            <span className="text-red-500 flex items-center">
                              <FaTimes className="mr-5 text-red-500" /> {/* Increased gap with mr-5 */}
                              Pending
                            </span>
                          ) : (
                            <span className="text-green-500 flex items-center">
                              <FaCheckCircle className="mr-5 text-green-500"  /> {/* Increased gap with mr-5 */}
                              {M.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Maintainancedues;
