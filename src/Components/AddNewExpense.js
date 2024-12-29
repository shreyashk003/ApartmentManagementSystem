import axios from "axios";
import React, { useRef } from "react";

function AddNewExpense() {
  const description=useRef("")

  const AddExpense = () => {

    const payload={
      Description:description.current.value
    }

    axios.post("http://localhost:9000/api/adddescription",payload)
    .then(response=>{
      alert("Description Added")
    })
    .catch(err=>{
      console.log(err)
    })
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add New Expense</h1>
        <div className="space-y-4">
          <input
          ref={description}
            type="text"
            placeholder="Enter Description"
            className="w-full p-3 text-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={AddExpense}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewExpense;
