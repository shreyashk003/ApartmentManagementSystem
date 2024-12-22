import React, { useState } from "react";
import axios from "axios";

function ComplaintFeedback() {
  const [complaint, setComplaint] = useState({
    category: "",
    description: "",
    isAnonymous: false,
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComplaint((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      category: complaint.category,
      description: complaint.description,
      isAnonymous: complaint.isAnonymous,
      status: "Pending", // Always set to 'Pending'
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/AddComplaint",
        payload
      );
      alert(response.data.message || "Complaint submitted successfully!");
      setComplaint({
        category: "",
        description: "",
        isAnonymous: false,
        status: "Pending",
      }); // Reset form
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 rounded-xl shadow-2xl">
      <h2 className="text-gray-100 text-2xl font-semibold mb-6 text-center">Complaint and Feedback</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Category</label>
          <select
            name="category"
            value={complaint.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="maintenance">Maintenance</option>
            <option value="security">Security</option>
            <option value="parking">Parking</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div className="flex flex-col">
          <label className="text-gray-400 mb-2">Description</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleInputChange}
            placeholder="Describe your complaint or feedback"
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          ></textarea>
        </div>

        {/* Anonymity Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isAnonymous"
            checked={complaint.isAnonymous}
            onChange={handleInputChange}
            className="w-5 h-5 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-purple-600"
          />
          <label className="text-gray-400">Submit anonymously</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintFeedback;
