import axios from 'axios';
import React, { useRef } from 'react';

function Apartment() {
  const Aname = useRef("");
  const Address = useRef("");
  const Area = useRef("");
  const City = useRef("");
  const Buildername = useRef("");
  const NumWings = useRef("");
  const SocietyName = useRef("");

  const addApartmentdata = () => {
    const payload = {
      Apartmentname: Aname.current.value,
      Address: Address.current.value,
      AreaName: Area.current.value,
      City: City.current.value,
      Buildername: Buildername.current.value,
      NumberOfWings: NumWings.current.value,
      SocietyName: SocietyName.current.value,
    };

    axios
      .post("http://localhost:9000/api/insertApartmentData", payload)
      .then((response) => {
        alert("Apartment data inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Apartment Details</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Apartment Name:</label>
          <input
            type="text"
            ref={Aname}
            placeholder="Enter apartment name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Address:</label>
          <input
            type="text"
            ref={Address}
            placeholder="Enter address"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Area Name:</label>
          <input
            type="text"
            ref={Area}
            placeholder="Enter area name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">City:</label>
          <input
            type="text"
            ref={City}
            placeholder="Enter city"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Builder Name:</label>
          <input
            type="text"
            ref={Buildername}
            placeholder="Enter builder name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Number of Wings:</label>
          <input
            type="number"
            ref={NumWings}
            placeholder="Enter number of wings"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Society Name:</label>
          <input
            type="text"
            ref={SocietyName}
            placeholder="Enter society name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="button"
          onClick={addApartmentdata}
          className="w-full bg-blue-500 text-white font-medium p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Apartment;
