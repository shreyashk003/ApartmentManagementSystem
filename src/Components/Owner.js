import React from "react";
import ComplaintFeedback from "./Complaint";
import Maintainance from "./Maintainance";

function Owner({ oid,username }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white p-8">
      <h1 className="text-center text-4xl font-bold mb-10 tracking-wide text-yellow-300">
        Owner Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Maintainance Component */}
        <div className="p-6 bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Maintainance</h2>
          <Maintainance oid={oid} username={username} />
        </div>
        {/* ComplaintFeedback Component */}
        <div className="p-6 bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Complaints Feedback</h2>
          <ComplaintFeedback username={username} />
        </div>
      </div>
    </div>
  );
}

export default Owner;
