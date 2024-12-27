import React from 'react';
import { Bell, Building2, ChevronRight, MessageSquare, Shield, Users } from 'lucide-react';

const EnhancedLandingPage = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Tenant Portal',
      description: 'Self-service portal for maintenance requests, rent payments, and communication'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Payments',
      description: 'Integrated payment processing with bank-grade security and automation'
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: 'Smart Notifications',
      description: 'Automated alerts for maintenance, rent collection, and important updates'
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Communication Hub',
      description: 'Centralized messaging system for tenants, owners, and staff'
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Property Analytics',
      description: 'Real-time insights and reports on property performance metrics'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Document Management',
      description: 'Digital storage for leases, contracts, and important paperwork'
    }
  ];

  const testimonials = [
    {
      quote: 'The automation features have saved us countless hours in property management tasks.',
      author: 'Sarah Chen',
      role: 'Property Manager'
    },
    {
      quote: 'Excellent platform that has streamlined our entire operation. The tenant portal is a game-changer.',
      author: 'Michael Roberts',
      role: 'Building Owner'
    },
    {
      quote: 'The best property management solution we have used. Support team is incredibly responsive.',
      author: 'Jessica Martinez',
      role: 'Real Estate Director'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
              <h1 className="text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
  GrihaMitra
</h1>
<p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
  Simplify property management with <span className="font-semibold text-teal-500">GrihaMitra</span>.  
  Our platform provides a seamless experience for managing apartments—from tenant communication to maintenance scheduling.  
  Enhance efficiency, streamline operations, and elevate tenant satisfaction with a reliable solution tailored to your needs.
</p>


                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center">
                    Get Started <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                    Schedule Demo
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/Amar.jpg"
                    alt="Showcase"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/10" />
                </div>
                <div className="absolute -z-10 top-1/2 right-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute -z-10 bottom-1/2 left-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Featured Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group relative rounded-xl overflow-hidden shadow-lg">
                  <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">Luxury Apartment {item}</h3>
                    <p className="text-white/80">Premium living spaces with modern amenities</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Powerful Features for Modern Property Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 hover:shadow-xl transition group">
                  <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Trusted by Property Managers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-slate-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mr-4"></div>
                    <div>
                      <h4 className="text-gray-900 font-semibold">{testimonial.author}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
            <div className="flex items-center mb-5">
  <img src="/logox.jpg" alt="Company Logo" className="h-10 w-10 object-cover rounded-full shadow-md mr-2" />
  <span className="text-lg font-bold text-white">jFork Technology Services</span>
</div>






              <p className="text-gray-400">
                Transforming property management through innovative technology solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} jFork Technology Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLandingPage;
