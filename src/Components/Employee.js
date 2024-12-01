import React, { useState } from "react";
import axios from "axios";

const Employee = () => {
  const [formData, setFormData] = useState({
    empid: "",
    empcell: "",
    empgender: "m", // default gender
    empaadharno: "",
    empaddress: "",
    empname: "",
    empsalarydet: [{ salary: "", date: "" }] // default salary entry
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle salary details change
  const handleSalaryChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSalaryDetails = [...formData.empsalarydet];
    updatedSalaryDetails[index][name] = value;
    setFormData({ ...formData, empsalarydet: updatedSalaryDetails });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear any previous messages

    try {
      // Make API request to insert data into MongoDB
      const response = await axios.post("http://localhost:9000/api/Addemployees", formData);

      if (response.status === 200) {
        setMessage("Employee added successfully!");
        setFormData({
          empid: "",
          empcell: "",
          empgender: "m",
          empaadharno: "",
          empaddress: "",
          empname: "",
          empsalarydet: [],
        });
      } else {
        setMessage("Failed to add employee.");
      }
    } catch (error) {
      setMessage("Error adding employee. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen max-w-6xl py-10 px-5">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Add-Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="empid" className="block text-lg font-medium text-gray-300">Employee ID:</label>
            <input
              type="text"
              id="empid"
              name="empid"
              value={formData.empid}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="empname" className="block text-lg font-medium text-gray-300">Name:</label>
            <input
              type="text"
              id="empname"
              name="empname"
              value={formData.empname}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="empcell" className="block text-lg font-medium text-gray-300">Contact Number:</label>
            <input
              type="text"
              id="empcell"
              name="empcell"
              value={formData.empcell}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="empgender" className="block text-lg font-medium text-gray-300">Gender:</label>
            <select
              id="empgender"
              name="empgender"
              value={formData.empgender}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="empaadharno" className="block text-lg font-medium text-gray-300">Aadhar Number:</label>
            <input
              type="text"
              id="empaadharno"
              name="empaadharno"
              value={formData.empaadharno}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="empaddress" className="block text-lg font-medium text-gray-300">Address:</label>
            <input
              type="text"
              id="empaddress"
              name="empaddress"
              value={formData.empaddress}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg font-semibold hover:bg-gradient-to-l transition duration-300"
          >
            {isLoading ? "Adding Employee..." : "Add Employee"}
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
};

export default Employee;
