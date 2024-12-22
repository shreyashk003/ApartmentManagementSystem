import React, { useRef } from "react";
import axios from "axios";

function AddApartmentDetails() {
  const ApartmentName = useRef("");
  const BuilderName = useRef("");
  const Address = useRef("");
  const AreaName = useRef("");
  const City = useRef("");
  const NoOfWings = useRef("");
  const NoOfFlats = useRef("");
  const NoOfFloors = useRef("");
  const SocietyName = useRef("");
  const RegistrationNumber = useRef("");
  const RegistrationDate = useRef("");

  const addApartmentDetails = () => {
    const payload = {
      ApartmentName: ApartmentName.current.value,
      BuilderName: BuilderName.current.value,
      Address: Address.current.value,
      AreaName: AreaName.current.value,
      City: City.current.value,
      NoOfWings: NoOfWings.current.value,
      NoOfFlats: NoOfFlats.current.value,
      NoOfFloors: NoOfFloors.current.value,
      SocietyName: SocietyName.current.value,
      RegistrationNumber: RegistrationNumber.current.value,
      RegistrationDate: RegistrationDate.current.value,
    };

    axios
      .post("http://localhost:9000/api/insertApartmentDetails", payload)
      .then((response) => {
        alert("Apartment details have been successfully inserted!");
        // Clear input fields after submission
        ApartmentName.current.value = "";
        BuilderName.current.value = "";
        Address.current.value = "";
        AreaName.current.value = "";
        City.current.value = "";
        NoOfWings.current.value = "";
        NoOfFlats.current.value = "";
        NoOfFloors.current.value = "";
        SocietyName.current.value = "";
        RegistrationNumber.current.value = "";
        RegistrationDate.current.value = "";
      })
      .catch((err) => {
        console.error("Error inserting apartment details:", err);
        alert("Failed to insert apartment details. Please try again.");
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4 text-center">Add Apartment Details</h2>
      <div className="space-y-4">
        {/* Apartment Name Input */}
        <div className="relative">
          <input
            type="text"
            ref={ApartmentName}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Apartment Name"
            name="apartmentName"
          />
        </div>

        {/* Builder Name Input */}
        <div className="relative">
          <input
            type="text"
            ref={BuilderName}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Builder Name"
            name="builderName"
          />
        </div>

        {/* Address Input */}
        <div className="relative">
          <input
            type="text"
            ref={Address}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Address"
            name="address"
          />
        </div>

        {/* Area Name Input */}
        <div className="relative">
          <input
            type="text"
            ref={AreaName}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Area Name"
            name="areaName"
          />
        </div>

        {/* City Input */}
        <div className="relative">
          <input
            type="text"
            ref={City}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="City"
            name="city"
          />
        </div>

        {/* No. of Wings Input */}
        <div className="relative">
          <input
            type="number"
            ref={NoOfWings}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="No. of Wings"
            name="noOfWings"
          />
        </div>

        {/* No. of Flats Input */}
        <div className="relative">
          <input
            type="number"
            ref={NoOfFlats}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="No. of Flats"
            name="noOfFlats"
          />
        </div>

        {/* No. of Floors Input */}
        <div className="relative">
          <input
            type="number"
            ref={NoOfFloors}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="No. of Floors"
            name="noOfFloors"
          />
        </div>

        {/* Society Name Input */}
        <div className="relative">
          <input
            type="text"
            ref={SocietyName}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Society Name"
            name="societyName"
          />
        </div>

        {/* Registration Number Input */}
        <div className="relative">
          <input
            type="text"
            ref={RegistrationNumber}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Registration Number"
            name="registrationNumber"
          />
        </div>

        {/* Registration Date Input */}
        <div className="relative">
          <input
            type="date"
            ref={RegistrationDate}
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg"
            placeholder="Registration Date"
            name="registrationDate"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-md shadow-lg hover:from-green-500 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
            onClick={addApartmentDetails}
          >
            Add Apartment Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddApartmentDetails;
