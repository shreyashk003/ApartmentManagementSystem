import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, X, Home as HomeIcon, Info, Phone, LogIn } from "lucide-react";
import About from "./About";
import Information from "./Information";
import Contact from "./Contact";
import LoginPage from "./LoginPage";
import Test from "./Test";
import axios from "axios";
import Testsms from "./Testsms";

function Home({ setLoginStatus, setUserType, setOid, setUsername }) {
  const [apartmentName, setApartmentname] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9000/api/getAptname")
      .then(response => {
        setApartmentname(response.data[0].Apartmentname)
      })
      .catch(err => {
        console.log(err)
      })

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ to, children, icon: Icon }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`relative px-4 py-2 text-lg transition-all duration-300 group flex items-center gap-2 
          ${isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
      >
        {Icon && <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80'}`} />}
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 
          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
      </Link>
    );
  };

  return (
   <div> <Testsms></Testsms>
    <Router>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50">
        {/* Navbar */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gradient-to-r from-teal-600/95 to-blue-500/95 backdrop-blur-md shadow-xl' 
            : 'bg-gradient-to-r from-teal-600 to-blue-500'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center py-4">
              {/* Logo/Title */}
              <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20 
                            transform transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                <h1 className="text-gray-800 text-lg sm:text-xl font-bold tracking-wide leading-snug">
                  {apartmentName}
                </h1>
                <span className="block mt-0.5 text-sm sm:text-base font-medium text-gray-600">
                  Apartment Management System
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <NavLink to="/home" icon={HomeIcon}>Home</NavLink>
                <NavLink to="/about" icon={Info}>About</NavLink>
                <NavLink to="/information" icon={Info}>Information</NavLink>
                <NavLink to="/contact" icon={Phone}>Contact</NavLink>
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-white/95 text-teal-600 rounded-xl font-semibold 
                           transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5
                           flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors duration-300
                         focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden bg-gradient-to-r from-teal-700 to-blue-600 border-t border-white/10`}>
            <div className="px-4 py-3 space-y-2">
              <Link to="/home" 
                className="flex items-center gap-2 px-4 py-2.5 text-white hover:bg-white/10 rounded-xl transition-colors duration-300">
                <HomeIcon size={18} />
                Home
              </Link>
              <Link to="/about" 
                className="flex items-center gap-2 px-4 py-2.5 text-white hover:bg-white/10 rounded-xl transition-colors duration-300">
                <Info size={18} />
                About
              </Link>
              <Link to="/information" 
                className="flex items-center gap-2 px-4 py-2.5 text-white hover:bg-white/10 rounded-xl transition-colors duration-300">
                <Info size={18} />
                Information
              </Link>
              <Link to="/contact" 
                className="flex items-center gap-2 px-4 py-2.5 text-white hover:bg-white/10 rounded-xl transition-colors duration-300">
                <Phone size={18} />
                Contact
              </Link>
              <Link to="/login" 
                className="flex items-center gap-2 px-4 py-2.5 bg-white/95 text-teal-600 rounded-xl font-medium 
                          hover:bg-white transition-colors duration-300">
                <LogIn size={18} />
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-grow pt-28 sm:pt-32">
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/home" element={<Test />} />
            <Route path="/about" element={<About />} />
            <Route path="/information" element={<Information />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setLoginStatus={setLoginStatus}
                  setUserType={setUserType}
                  setOid={setOid}
                  setUsername={setUsername}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default Home;