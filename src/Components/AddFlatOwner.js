import axios from 'axios';
import React, { useRef } from 'react';

function AddFlatOwner({}) {

const Oname=useRef("")
const FlatNumber=useRef("")
const contact=useRef("")

const addFlatOwner=()=>{
  let Oname1=Oname.current.value
  let FlatNumber1=FlatNumber.current.value
  let contact1=contact.current.value



const payload={
  Oname:Oname1,
  FlatNumber:FlatNumber1,
  contact:contact1

}
axios.post("http://localhost:9000/api/insertFlatOwner",payload)
.then(response=>{
  alert("Owner Inserted")

})
.catch(err=>{
  console.log(err)
})
}




  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4 text-center">Add Flat Owner</h2>
      <div className="space-y-4">
        {/* Owner Name Input */}
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
            placeholder="Owner Name"
            name="name"
            
            ref={Oname}
          />
        </div>

        {/* Flat Number Input */}
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
            placeholder="Flat Number"
            name="flatNumber"
        
            ref={FlatNumber}
          />
        </div>

        {/* Contact Number Input */}
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-900 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
            placeholder="Contact Number"
            name="contact"
            ref={contact}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md shadow-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={addFlatOwner}
          >
            Add Owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFlatOwner;
