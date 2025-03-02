import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, password }),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.token);
                navigate('/dashboard');
            } else {
                // Handle error
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Navbar />
            <main className="flex-grow flex items-center justify-center px-6 py-24">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-6">Create your account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
                        </div>
                        <div className="mb-6">
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-1 h-4 w-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-700"
                                />
                                <span className="ml-2 text-sm text-gray-400">
                                    I agree to the{' '}
                                    <Link to="/privacy-policy" className="text-purple-400 hover:text-purple-300">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy-policy" className="text-purple-400 hover:text-purple-300">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !agreed}
                            className={`w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors ${loading || !agreed ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-400 hover:text-purple-300">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Signup;