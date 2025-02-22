import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4">
      {/* Logo Section */}
      <div className="text-white text-2xl font-bold">
        <Link to="/" className="hover:text-yellow-400 transition">
          Kahani.AI
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="text-white flex gap-6">
        <Link to="/pricing" className="hover:text-yellow-400 transition">Pricing</Link>
        <Link to="/blog" className="hover:text-yellow-400 transition">Blog</Link>
        <Link to="/discord" className="hover:text-yellow-400 transition">Discord</Link>
        <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
      </div>
    </nav>
  );
};

export default Header;