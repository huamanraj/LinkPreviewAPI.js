import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCopy, FaCheck } from 'react-icons/fa';

function Docs() {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:items-start">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 lg:flex-shrink-0 lg:mr-8">
            <nav className="sticky top-6">
              <div className="space-y-1">
                <a href="#getting-started" className="block px-3 py-2 text-base font-medium text-white rounded-md bg-gray-800">
                  Getting Started
                </a>
                <a href="#authentication" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
                  Authentication
                </a>
                <a href="#endpoints" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
                  Endpoints
                </a>
                <a href="#response" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
                  Response Format
                </a>
                <a href="#error-handling" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
                  Error Handling
                </a>
                <a href="#rate-limits" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
                  Rate Limits
                </a>
              </div>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="mt-8 lg:mt-0 lg:flex-grow">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-bold mb-6">API Documentation</h1>
              
              <section id="getting-started" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <p className="text-gray-400 mb-6">
                  To use the LinkSight Preview API, you need to authenticate with an API key. 
                  Follow the steps below to integrate our API into your application.
                </p>
                
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Basic Request Example</h3>
                    <button 
                      onClick={() => copyToClipboard(`curl -X GET "https://api.linksight.com/preview?url=https://example.com" \\
  -H "Authorization: Bearer YOUR_API_KEY"`)}
                      className="flex items-center text-sm text-gray-400 hover:text-white"
                    >
                      {copied ? <FaCheck className="mr-1" /> : <FaCopy className="mr-1" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                    <code className="text-gray-300 text-sm">
{`curl -X GET "https://api.linksight.com/preview?url=https://example.com" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    </code>
                  </pre>
                </div>
              </section>
              
              <section id="authentication" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                <p className="text-gray-400 mb-4">
                  All API requests must include your API key in the Authorization header:
                </p>
                <pre className="bg-gray-800 p-4 rounded-md mb-4 overflow-x-auto">
                  <code className="text-gray-300 text-sm">
{`Authorization: Bearer YOUR_API_KEY`}
                  </code>
                </pre>
                <p className="text-gray-400">
                  You can obtain your API key from your account dashboard after signing up.
                </p>
              </section>
              
              <section id="endpoints" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
                
                <div className="border border-gray-700 rounded-lg mb-6 overflow-hidden">
                  <div className="bg-gray-800 p-4">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-900 text-green-300 mr-3">GET</span>
                      <span className="text-white font-mono">/preview</span>
                    </div>
                    <p className="mt-2 text-gray-400 text-sm">Get a preview for a specified URL</p>
                  </div>
                  <div className="p-4 border-t border-gray-700">
                    <h4 className="text-lg font-medium mb-2">Query Parameters</h4>
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 text-gray-300">Parameter</th>
                          <th className="text-left py-2 text-gray-300">Type</th>
                          <th className="text-left py-2 text-gray-300">Required</th>
                          <th className="text-left py-2 text-gray-300">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 text-white">url</td>
                          <td className="py-2 text-gray-400">string</td>
                          <td className="py-2 text-gray-400">Yes</td>
                          <td className="py-2 text-gray-400">The URL to generate a preview for</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              
              <section id="response" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Response Format</h2>
                <p className="text-gray-400 mb-4">
                  The API returns data in JSON format. Here's an example response:
                </p>
                <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                  <code className="text-gray-300 text-sm">
{`{
  "success": true,
  "data": {
    "url": "https://example.com",
    "title": "Example Domain",
    "description": "This domain is for use in illustrative examples in documents.",
    "favicon": "https://example.com/favicon.ico",
    "images": [
      {
        "url": "https://example.com/og-image.jpg",
        "width": 1200,
        "height": 630
      }
    ],
    "siteName": "Example",
    "type": "website"
  }
}`}
                  </code>
                </pre>
              </section>
              
              <section id="error-handling" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
                <p className="text-gray-400 mb-4">
                  When an error occurs, the API returns an error response with details:
                </p>
                <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                  <code className="text-gray-300 text-sm">
{`{
  "success": false,
  "error": {
    "code": "invalid_url",
    "message": "The provided URL is invalid or cannot be accessed."
  }
}`}
                  </code>
                </pre>
              </section>
              
              <section id="rate-limits">
                <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
                <p className="text-gray-400">
                  The API is rate-limited to 60 requests per minute per API key. If you exceed this limit,
                  you'll receive a 429 Too Many Requests response. The response headers include information
                  about your rate limit status.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Docs;
