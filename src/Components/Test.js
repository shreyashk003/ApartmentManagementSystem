import React from 'react';

function Test() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Header */}
      

      {/* Hero Section */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="Amar.jpg"
              alt="Apartment Overview"
              className="w-full h-96 object-cover brightness-95 transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-teal-900 bg-opacity-30 hover:bg-opacity-40 transition"></div>
            <h2 className="absolute bottom-6 left-6 text-4xl font-bold text-white drop-shadow-lg">
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-8">
            Simplify apartment management with intuitive features designed to streamline tenant
            management, expense tracking, and communication.
          </p>
          <div className="mt-6">
            <button className="bg-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-800 transition">
              Get Started
            </button>
            <button className="ml-4 border border-teal-700 text-teal-700 px-6 py-3 rounded-lg shadow-md hover:bg-teal-100 transition">
              Learn More
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Effortless Management',
              description:
                'Easily manage tenant details, update apartment information, and maintain records.',
              icon: '🏢',
            },
            {
              title: 'Transparent Finances',
              description:
                'Track expenses and payments for a clear and organized financial overview.',
              icon: '💵',
            },
            {
              title: 'Community Connect',
              description:
                'Seamlessly connect tenants, owners, and management for effective communication.',
              icon: '🤝',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform"
            >
              <div className="text-5xl text-teal-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-teal-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Testimonials Section */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold text-teal-700 text-center mb-8">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                quote:
                  'This platform has transformed apartment management for me. Highly recommend it!',
                author: 'Jane Doe',
              },
              {
                quote: 'A must-have tool for any apartment owner. Seamless and efficient!',
                author: 'John Smith',
              },
              {
                quote:
                  'Fantastic features and amazing support. A game-changer for our community!',
                author: 'Sarah Lee',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <h4 className="text-teal-700 font-bold">- {testimonial.author}</h4>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto text-center text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Apartment Management System. All Rights Reserved.
          </p>
          <p className="text-sm mt-2">
            Built with <span className="text-red-500">❤️</span> for seamless apartment living.
          </p>
          <div className="mt-4 space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Test;
