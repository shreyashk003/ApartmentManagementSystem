import React, { useRef } from "react";
import axios from "axios";

function AddFlatDetails() {
  const Oid = useRef("");
  const FlatNumber = useRef("");
  const FlatOwner = useRef("");
  const FlatSize = useRef("");

  const addFlatDetails = () => {
    const payload = {
      FlatNumber: FlatNumber.current.value,
      FlatOwner: FlatOwner.current.value,
      Oid: Oid.current.value,
      FlatSize: FlatSize.current.value,
    };

    axios
      .post("http://localhost:9000/api/insertFlatDetails", payload)
      .then((response) => {
        alert("Flat details have been successfully inserted!");
        // Clear input fields after submission
        FlatNumber.current.value = "";
        FlatOwner.current.value = "";
        Oid.current.value = "";
        FlatSize.current.value = "";
      })
      .catch((err) => {
        console.error("Error inserting flat details:", err);
        alert("Failed to insert flat details. Please try again.");
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4 text-center">Add Flat Details</h2>
      <div className="space-y-4">
        {/* Flat Number Input */}
        <div className="relative">
          <input
            type="text"
            ref={FlatNumber}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Flat Number"
            name="flatNumber"
          />
        </div>

        {/* Owner Name Input */}
        <div className="relative">
          <input
            type="text"
            ref={FlatOwner}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Owner Name"
            name="ownerName"
          />
        </div>

        {/* Owner ID Input */}
        <div className="relative">
          <input
            type="text"
            ref={Oid}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Owner ID"
            name="ownerId"
          />
        </div>

        {/* Flat Size Input */}
        <div className="relative">
          <input
            type="text"
            ref={FlatSize}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Flat Size (sq ft)"
            name="size"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-md shadow-lg hover:from-green-500 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
            onClick={addFlatDetails}
          >
            Add Flat
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFlatDetails;
