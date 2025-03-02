import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  API Status
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="https://twitter.com/huamanraj" className="text-gray-400 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/huamanraj" className="text-gray-400 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/huamanraj" className="text-gray-400 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} LinkPreviewAPI.js. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;