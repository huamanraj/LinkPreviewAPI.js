import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PrivacyPolicy() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-400 mb-4">
              At LinkSight Preview API, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our API service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our API.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-gray-400 mb-4">
              We may collect information about you in various ways, including:
            </p>
            <ul className="list-disc pl-6 text-gray-400 mb-4">
              <li className="mb-2">
                <strong className="text-white">Personal Data:</strong> When you register for an account, we collect your name and email address.
              </li>
              <li className="mb-2">
                <strong className="text-white">Usage Data:</strong> We may collect information about how you use our API, including the URLs you submit, timestamps of requests, and your IP address.
              </li>
              <li className="mb-2">
                <strong className="text-white">API Key Usage:</strong> We monitor the usage of your API key to enforce rate limits and ensure compliance with our terms of service.
              </li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-400 mb-4">
              We may use the information we collect about you for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-gray-400 mb-4">
              <li className="mb-2">To provide and maintain our API service</li>
              <li className="mb-2">To notify you about changes to our service</li>
              <li className="mb-2">To monitor and analyze usage patterns</li>
              <li className="mb-2">To detect, prevent, and address technical issues</li>
              <li className="mb-2">To enforce our terms of service</li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
            <p className="text-gray-400 mb-4">
              We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p className="text-gray-400 mb-4">
              We will also retain usage data for internal analysis purposes. Usage data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our service, or we are legally obligated to retain this data for longer time periods.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Security of Your Data</h2>
            <p className="text-gray-400 mb-4">
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-gray-400 mb-4">
              You have certain rights regarding your personal data, including:
            </p>
            <ul className="list-disc pl-6 text-gray-400 mb-4">
              <li className="mb-2">The right to access, update or delete the information we have on you</li>
              <li className="mb-2">The right of rectification - the right to correct inaccurate information</li>
              <li className="mb-2">The right to object to our processing of your personal data</li>
              <li className="mb-2">The right to request restriction of processing of your personal data</li>
              <li className="mb-2">The right to data portability</li>
              <li className="mb-2">The right to withdraw consent</li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-gray-400 mb-4">
              We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related tasks, or assist us in analyzing how our Service is used.
            </p>
            <p className="text-gray-400 mb-4">
              These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-gray-400 mb-4">
              Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us so that we can take necessary actions.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-400 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
            <p className="text-gray-400 mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-400 mb-4">
              <li className="mb-2">By email: support@linksight.example.com</li>
              <li className="mb-2">By visiting the contact page on our website</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
