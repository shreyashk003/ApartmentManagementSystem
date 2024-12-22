import React from 'react';

function Test() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <header className="bg-teal-600 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-white text-2xl font-bold">Welcome</h1>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-teal-600 mb-4">
            Welcome to Your One-Stop Apartment Management System
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            From managing tenant information to tracking expenses and ensuring seamless communication, we empower you to handle your apartment's needs effortlessly.
          </p>
          <div className="mt-6">
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">Get Started</button>
            <button className="ml-4 border border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-100 transition">Learn More</button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-xl font-bold text-teal-600 mb-2">
              Effortless Management
            </h3>
            <p className="text-gray-600">
              Track apartment details, manage tenants, and update information with ease.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-xl font-bold text-teal-600 mb-2">
              Transparent Finances
            </h3>
            <p className="text-gray-600">
              Keep tabs on expenses and ensure a transparent financial system for your community.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
            <h3 className="text-xl font-bold text-teal-600 mb-2">
              Community Connect
            </h3>
            <p className="text-gray-600">
              Foster communication between tenants, owners, and management seamlessly.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-teal-600 text-center mb-6">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-teal-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "This platform has completely transformed the way I manage my apartment. Highly recommend it!"
              </p>
              <h4 className="mt-4 text-teal-600 font-bold">- Jane Doe</h4>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "A must-have tool for any apartment owner. Seamless and efficient!"
              </p>
              <h4 className="mt-4 text-teal-600 font-bold">- John Smith</h4>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "Fantastic features and amazing support. It's been a game-changer for our community."
              </p>
              <h4 className="mt-4 text-teal-600 font-bold">- Sarah Lee</h4>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Apartment Management System. All Rights Reserved.
          </p>
          <p className="text-sm mt-2">
            Built with <span className="text-red-500">❤️</span> for seamless apartment living.
          </p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Test;
