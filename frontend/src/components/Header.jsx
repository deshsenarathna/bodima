import React, { use } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from '../hooks/useAuth';

const Header = () => {

  const user = useAuth();
  const navigate = useNavigate();
  return (
    <header className="w-full bg-[#0f172a] shadow-sm border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between flex-nowrap">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <FaHome className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">BoardEase</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center">
          <ul className="flex items-center gap-4 md:gap-8 whitespace-nowrap">
            <li>
              <NavLink to="/" className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({isActive}) => `font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Contact</NavLink>
            </li>
          </ul>
        </nav>

        {/* Right: Login/Sign Up Button */}
        <div className="flex items-center">
          <Link to="/login" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
            <FiLogIn className="h-4 w-4 mr-2" />
            Login / Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};
// ...existing code...

export default Header;