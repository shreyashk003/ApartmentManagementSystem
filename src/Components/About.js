import React, { useState } from "react";
import { Building, Users, Calculator, MessageSquare, ChevronRight, Home,Clock,User } from "lucide-react";

function About() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Property Management",
      description: "Comprehensive tools for tenant and flat owner management with intuitive interfaces.",
      bgColor: "from-teal-500 to-emerald-500"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Financial Tracking",
      description: "Transparent financial reporting and tracking systems for better accountability.",
      bgColor: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Communication",
      description: "Seamless communication channels to keep your apartment community connected.",
      bgColor: "from-violet-500 to-purple-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Custom Solutions",
      description: "Tailored solutions that adapt to your community's unique requirements.",
      bgColor: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { 
      number: "10+", 
      label: "Properties Listed", 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      number: "24/7", 
      label: "Service Availability", 
      icon: <Clock className="w-5 h-5" /> 
    },
    { 
      number: "5+", 
      label: "Team Members", 
      icon: <User className="w-5 h-5" /> 
    }
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero Section with Animated Background */}
        <div className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-r from-teal-600 to-blue-600 p-8 sm:p-16">
          <div className="relative z-10 text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 animate-fade-in">
              About Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Transforming apartment living through innovative management solutions that bring communities together.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-100 rounded-lg text-teal-600">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800 tracking-tight">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg text-white bg-gradient-to-r ${feature.bgColor}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 ml-4">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-teal-600 transition-transform duration-300 transform translate-x-0 group-hover:translate-x-2">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </div>
              </div>
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${feature.bgColor} opacity-0 transition-opacity duration-300 ${hoveredFeature === index ? 'opacity-5' : ''}`}
              />
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl mb-16">
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are dedicated to revolutionizing apartment living by creating powerful yet intuitive management tools. 
              Our platform brings transparency, efficiency, and community connection to every aspect of apartment operations.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500"></div>
        </div>

        {/* Values Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 p-8 sm:p-12">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Choose Us
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              With years of experience in property management and technology, 
              we understand the unique challenges faced by apartment communities. 
              Our platform is built on the foundation of user feedback and continuous improvement, 
              ensuring that we deliver solutions that truly matter to our users.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-pattern {
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 2px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}

export default About;