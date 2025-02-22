// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <Link to="/" className="hover:text-yellow-400 transition duration-300">
              Kahani.AI
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/discord">Discord</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Custom NavLink component with active state handling
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-white hover:text-yellow-400 transition duration-300 pb-1 border-b-2 ${
        isActive ? 'border-yellow-400' : 'border-transparent'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;