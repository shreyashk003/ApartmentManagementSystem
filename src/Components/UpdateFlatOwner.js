import React, { useRef } from "react";
import axios from "axios";

function UpdateFlatOwner() {
  const FlatId = useRef("");
  const NewOwner = useRef("");

  const updateFlatOwner = () => {
    const payload = {
      id: FlatId.current.value,
      newOwner: NewOwner.current.value,
    };

    axios
      .put("http://localhost:9000/api/updateFlatOwner", payload)
      .then((response) => {
        alert("Flat owner updated successfully!");
        FlatId.current.value = "";
        NewOwner.current.value = "";
      })
      .catch((err) => {
        console.error("Error updating flat owner:", err);
        alert("Failed to update flat owner. Please try again.");
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4 text-center">
        Update Flat Owner
      </h2>
      <div className="space-y-4">
        {/* Flat ID Input */}
        <div className="relative">
          <input
            type="text"
            ref={FlatId}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg"
            placeholder="Flat ID"
          />
        </div>

        {/* New Owner Input */}
        <div className="relative">
          <input
            type="text"
            ref={NewOwner}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg"
            placeholder="New Owner Name"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-md shadow-lg hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
            onClick={updateFlatOwner}
          >
            Update Owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateFlatOwner;
