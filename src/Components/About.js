import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-teal-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            Discover how we help communities thrive with seamless apartment management.
          </p>
        </header>

        {/* About Content */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-teal-500 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-6">
            At Apartment Management System, we provide cutting-edge tools to streamline apartment operations for residents and administrators alike. Our platform is designed to create a better living experience by making everyday tasks simple and efficient.
          </p>

          <h2 className="text-2xl font-bold text-teal-500 mb-4">
            What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Comprehensive tools for tenant and flat owner management.</li>
            <li>Transparent financial tracking and reporting.</li>
            <li>Seamless communication channels for apartment communities.</li>
            <li>Customized solutions tailored to your unique needs.</li>
          </ul>

          <h2 className="text-2xl font-bold text-teal-500 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            We are committed to building a platform that fosters harmony, transparency, and convenience for all apartment residents and administrators.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
