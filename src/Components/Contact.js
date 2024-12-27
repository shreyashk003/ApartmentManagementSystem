import React, { useState } from "react";
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setStatus("Message sent successfully!");
    } catch (error) {
      setStatus("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-16">
      {/* Enhanced Header Section */}
      <div className="text-center mb-16 px-4">
  <h1 className="text-5xl font-semibold text-gray-800 mb-4 tracking-tight">Contact Us</h1>
  <p className="text-gray-500 text-lg max-w-2xl mx-auto">We'd love to hear from you. Send us a message, and we'll get back to you as soon as possible.</p>
</div>


      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* CEO Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden col-span-full md:col-span-1 transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="flex justify-center mt-6">
  <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-1 shadow-lg">
    <div className="w-full h-full bg-white rounded-full overflow-hidden">
      <img 
        src="/sunilsir.jpg" 
        alt="Sunil F Rodd"
        className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
      />
    </div>
  </div>
</div>

            <div className="p-8">
              <div className="uppercase tracking-wider text-sm text-teal-600 font-bold mb-2">Leadership</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sunil F Rodd</h2>
              <p className="text-gray-600 font-semibold text-lg">CEO & Founder</p>
              <p>jFork Technology Services Pvt.Ltd</p>
              <h2>sfroddjforkts@gmail.com</h2>
            </div>
          </div>

          {/* Developer Cards */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:col-span-1 transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="flex justify-center mt-7">
  <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-pink-400 via-yellow-500 to-orange-600 p-1 shadow-lg">
    <div className="w-full h-full bg-white rounded-full overflow-hidden">
      <img 
        src="/shrey.jpg" 
        alt="Shreyash M Kulkarni"
        className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
      />
    </div>
  </div>
</div>
            <div className="p-8">
              <div className="uppercase tracking-wider text-sm text-teal-600 font-bold mb-2">Development Team</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Shreyash M Kulkarni</h2>
              <p className="text-gray-600 font-semibold text-lg">Full Stack Web Dev</p>
              <h2>shreyashkulkarni03@gmail.com</h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:col-span-1 transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="flex justify-center mt-6">
  <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 p-1 shadow-lg">
    <div className="w-full h-full bg-white rounded-full overflow-hidden">
      <img 
        src="/ani.jpg" 
        alt="Anirudh S More"
        className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
      />
    </div>
  </div>
</div>
            <div className="p-8">
              <div className="uppercase tracking-wider text-sm text-teal-600 font-bold mb-2">Development Team</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Anirudh S More</h2>
              <p className="text-gray-600 font-semibold text-lg">Full Stack Web Dev</p>
              <h2>anirudhmore43@gmail.com</h2>
            </div>
          </div>
        </div>

        {/* Enhanced Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
            <Mail className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 text-lg">sfroddjforkts@gmail.com</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
            <Phone className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 text-lg">+91 948 027 5919</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
            <MapPin className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-lg">CIN: U80902KA2022PTC164766</p>
          </div>
        </div>

        {/* Enhanced Office Addresses */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
            <Building2 className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Head Office</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              jFork Technology Services<br />
              CTS 549, A1. Sonar galli,<br />
              M. Vadagaon, Belgaum - 590005<br />
              Karnataka
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
            <Building2 className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Branch Office</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Flat No.103, Amar Elite Apartment<br />
              3rd Cross, Bhagyanagar<br />
              Belagavi - 590006
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-10 shadow-2xl rounded-2xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-3 text-lg">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-3 text-lg">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-3 text-lg">Your Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message"
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 h-48"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-xl text-center font-semibold text-lg ${
            status.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;