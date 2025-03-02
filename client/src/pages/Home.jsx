import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaCode, FaKey, FaLock, FaChartLine, FaUserShield } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
          {/* <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" /> */}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-6">
              Generate Rich URL Previews<br />with One API Call
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
              Extract metadata from any URL including title, description, favicon, and OG images.
              Perfect for applications that need to display link previews in their UI.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/signup" className="px-6 py-3 text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition duration-300 ease-in-out flex items-center">
                Get Started <FaArrowRight className="ml-2" />
              </Link>
              <Link to="/docs" className="px-6 py-3 text-base font-medium rounded-md text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 transition duration-300 ease-in-out flex items-center">
                View Docs <FaCode className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
              Everything you need to integrate rich link previews into your application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-800/20 hover:border-gray-600">
              <div className="h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-5">
                <FaKey className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">API Key Authentication</h3>
              <p className="text-gray-400">
                Secure your application with API key authentication for all your preview requests.
              </p>
            </div>
            
            
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-800/20 hover:border-gray-600">
              <div className="h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-5">
                <FaChartLine className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rate Limiting</h3>
              <p className="text-gray-400">
                Protect your application with rate limiting of 60 requests per minute per API key.
              </p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-800/20 hover:border-gray-600">
              <div className="h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-5">
                <FaUserShield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">User Management</h3>
              <p className="text-gray-400">
                Comprehensive user registration and API key management system built-in.
              </p>
            </div>
            
            
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 md:flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Ready to get started?</h2>
                <p className="mt-3 text-purple-100 max-w-3xl">
                  Sign up today and get 1,000 free API calls per month. No credit card required.
                </p>
              </div>
              <div className="mt-8 md:mt-0 flex">
                <Link to="/signup" className="px-6 py-3 text-base font-medium rounded-md text-purple-900 bg-white hover:bg-gray-100 transition duration-300 ease-in-out flex items-center">
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
