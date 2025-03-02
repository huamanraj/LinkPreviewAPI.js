import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-800 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold">
                LinkPreviewAPI.js
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/docs" 
                  className="text-gray-300 hover:text-white transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium"
                >
                  Docs
                </Link>
                <Link 
                  to="/privacy-policy" 
                  className="text-gray-300 hover:text-white transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium"
                >
                  Privacy
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {children || (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 border border-gray-700 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 transition duration-300 ease-in-out"
                  >
                    <FaSignInAlt className="text-xs" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    <FaUserPlus className="text-xs" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-2">
            <Link to="/" className="block py-2 text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/docs" className="block py-2 text-gray-300 hover:text-white">
              Docs
            </Link>
            <Link to="/privacy-policy" className="block py-2 text-gray-300 hover:text-white">
              Privacy
            </Link>
            {children || (
              <>
                <Link to="/login" className="block py-2 text-gray-300 hover:text-white">
                  Login
                </Link>
                <Link to="/signup" className="block py-2 text-gray-300 hover:text-white">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;