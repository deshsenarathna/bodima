import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FiLogIn, FiUser, FiLogOut, FiPlus, FiList } from "react-icons/fi";
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAccountOpen(false);
    navigate('/');
  };

  return (
    <header className="w-full bg-[#0f172a] shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between flex-nowrap">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <FaHome className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">BoardEas</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center">
          <ul className="flex items-center gap-4 md:gap-8 whitespace-nowrap">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`
                }
              >
                Contact
              </NavLink>
            </li>

            {/* Links visible only when logged in */}
            {user && (
              <>
                <li>
                  <NavLink
                    to="/search"
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`
                    }
                  >
                    <FiList className="h-4 w-4" />
                    Listings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-place"
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`
                    }
                  >
                    <FiPlus className="h-4 w-4" />
                    Make Post
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Right: Auth / Account */}
        <div className="relative flex items-center">
          {!user ? (
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <FiLogIn className="h-4 w-4 mr-2" />
              Login / Sign Up
            </Link>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountOpen((v) => !v)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiUser className="h-4 w-4" />
                <span className="hidden sm:inline">{typeof user === 'string' ? user : 'Account'}</span>
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 z-50">
                  <div className="py-1">
                    <Link
                      to="/account"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Manage Account
                    </Link>
                    <Link
                      to="/search"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Listings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FiLogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;