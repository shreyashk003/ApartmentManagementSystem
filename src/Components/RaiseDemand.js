import axios from 'axios';
import React, { useRef, useState } from 'react';

function RaiseDemand() {
  const [isAdn, setisAdn] = useState(false);
  const description = useRef("");
  const year = useRef("");
  const duedate = useRef("");
  const amount = useRef("");
  const details = useRef("");

  const setStatus = () => {
    if (description.current.value === "Additonal Expense") setisAdn(true);
    else setisAdn(false);
  };

  const raiseDemand = async () => {
    const payload = {
      description: isAdn ? description.current.value + "--" + details.current.value : description.current.value,
      year: year.current.value,
      duedate: duedate.current.value,
      amount: amount.current.value
    };
    console.log(payload);
    await axios.post("http://localhost:9000/api/Raisedemand", payload)
      .then(response => {
        if (response.data.message === "Duplicate year detected in Maintainance field.") {
          alert("Duplicate year detected! Please check and try again.");
        } else if (response.data.message === "Demands submitted successfully") {
          alert("Demand Successfully Raised!!");
        } else {
          alert(response.data.message);
        }
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          alert("Error: " + err.response.data.message);
        } else {
          alert("An unexpected error occurred: " + err.message);
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-yellow-400 text-center">Raise Demand</h1>

        <select
          onChange={setStatus}
          ref={description}
          type="text"
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option selected>Annual Maintainance</option>
          <option>Additonal Expense</option>
        </select>

        {isAdn ? (
          <input
            ref={details}
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : ""}

        <select
          ref={year}
          className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled selected>
            Choose Year
          </option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>

        <input
          ref={duedate}
          type="date"
          placeholder="Last Date"
          className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          ref={amount}
          type="text"
          placeholder="Amount"
          className="w-full px-4 py-2 border border-gray-700 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={raiseDemand}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Raise Demand
        </button>
      </div>
    </div>
  );
}

export default RaiseDemand;
