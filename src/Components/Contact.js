import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post data to your backend API
      const response = await axios.post("http://localhost:9000/api/contact", formData);
      setStatus("Message sent successfully!");
    } catch (error) {
      setStatus("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-teal-600 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-lg">We'd love to hear from you. Send us a message!</p>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-xl mx-auto bg-white p-8 shadow-xl rounded-xl border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-36"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Status Message */}
        {status && (
          <p className="mt-4 text-center text-teal-600 font-semibold">{status}</p>
        )}
      </div>
    </div>
  );
}

export default Contact;
