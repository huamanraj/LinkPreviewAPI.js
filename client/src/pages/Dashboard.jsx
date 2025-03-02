import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaKey, FaTrash, FaPlus, FaCopy, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

function Dashboard() {
    const { logout, user } = useAuth();
    const [apiKeys, setApiKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newKeyTitle, setNewKeyTitle] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [copiedKey, setCopiedKey] = useState(null);
    const [visibleKeys, setVisibleKeys] = useState({});

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const fetchApiKeys = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch API keys');
            const data = await response.json();
            setApiKeys(data.apiKeys);
        } catch (error) {
            toast.error('Failed to load API keys');
        } finally {
            setLoading(false);
        }
    };

    const createApiKey = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-key`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title: newKeyTitle })
            });
            if (!response.ok) throw new Error('Failed to create API key');
            const data = await response.json();
            
            // Show the newly created key immediately
            setVisibleKeys(prev => ({
                ...prev,
                [data.key]: true // Show the new key by default
            }));
            
            await fetchApiKeys(); // Refresh the keys list
            setNewKeyTitle('');
            setShowCreateForm(false);
            toast.success('API key created successfully');
        } catch (error) {
            toast.error('Failed to create API key');
        } finally {
            setActionLoading(false);
        }
    };

    const deleteApiKey = async (keyToDelete) => {
        if (!window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return;
        
        setActionLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-key`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ apiKey: keyToDelete })
            });
            if (!response.ok) throw new Error('Failed to delete API key');
            setApiKeys(apiKeys.filter(key => key.key !== keyToDelete));
            toast.success('API key deleted successfully');
        } catch (error) {
            toast.error('Failed to delete API key');
        } finally {
            setActionLoading(false);
        }
    };

    const copyToClipboard = (key) => {
        navigator.clipboard.writeText(key)
            .then(() => {
                setCopiedKey(key);
                toast.success('API key copied to clipboard');
                setTimeout(() => setCopiedKey(null), 2000);
            })
            .catch(() => toast.error('Failed to copy API key'));
    };

    const toggleKeyVisibility = (keyId) => {
        setVisibleKeys(prev => ({
            ...prev,
            [keyId]: !prev[keyId]
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <Loader />;

    const navbarChildren = (
        <div className="flex items-center">
            
            <button 
                onClick={logout} 
                className="px-4 cursor-pointer py-2 bg-red-600 rounded hover:bg-red-700 transition duration-300"
            >
                Logout
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar>{navbarChildren}</Navbar>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* API Keys Section with improved styling */}
                <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">API Keys</h2>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            disabled={actionLoading}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                        >
                            <FaPlus className="mr-2" /> Create New Key
                        </button>
                    </div>

                    {showCreateForm && (
                        <form onSubmit={createApiKey} className="mb-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="API Key Title"
                                    value={newKeyTitle}
                                    onChange={(e) => setNewKeyTitle(e.target.value)}
                                    className="flex-grow px-4 py-2 bg-gray-700 rounded text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                                    required
                                    disabled={actionLoading}
                                />
                                <button 
                                    type="submit" 
                                    disabled={actionLoading}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
                                >
                                    {actionLoading ? <Loader fullScreen={false} /> : 'Create'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setShowCreateForm(false)}
                                    disabled={actionLoading}
                                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="space-y-4">
                        {apiKeys.map((key) => (
                            <div key={key.key} className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-between border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                <div className="flex-grow">
                                    {/* Title Section */}
                                    <div className="flex items-center mb-2">
                                        <FaKey className="mr-2 text-purple-400" />
                                        <span className="font-medium text-white">
                                            {key.title || "Untitled Key"}
                                        </span>
                                    </div>
                                    {/* API Key Section */}
                                    <div className="flex items-center bg-gray-900/50 px-3 py-2 rounded-md">
                                        <span className="font-mono text-sm">
                                            {visibleKeys[key.key] 
                                                ? key.key 
                                                : '•'.repeat(Math.min(32, key.key.length))}
                                        </span>
                                        <button
                                            onClick={() => toggleKeyVisibility(key.key)}
                                            className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                                            title={visibleKeys[key.key] ? "Hide API Key" : "Show API Key"}
                                        >
                                            {visibleKeys[key.key] ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                        </button>
                                    </div>
                                    {/* Created Date */}
                                    <p className="text-sm text-gray-400 mt-2">
                                        Created: {formatDate(key.createdAt)}
                                    </p>
                                </div>
                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => copyToClipboard(key.key)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors"
                                        title="Copy API Key"
                                    >
                                        {copiedKey === key.key ? <FaCheck /> : <FaCopy />}
                                    </button>
                                    <button
                                        onClick={() => deleteApiKey(key.key)}
                                        disabled={actionLoading}
                                        className="p-2 text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                                        title="Delete API Key"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {apiKeys.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                No API keys found. Create one to get started.
                            </div>
                        )}
                    </div>
                </div>

                {/* API Documentation Section */}
                <div className="mt-12 bg-gray-900/50 rounded-lg p-8 border border-gray-800">
                    <h2 className="text-xl font-bold mb-4">API Usage Guide</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-purple-400">Get Link Preview</h3>
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="px-2 py-1 bg-purple-600 rounded text-sm">POST</span>
                                    <code className="text-gray-300">{`${import.meta.env.VITE_BACKEND_URL}/preview`}</code>
                                </div>
                                
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold mb-2 text-gray-300">Headers:</h4>
                                    <pre className="bg-gray-900/50 p-3 rounded overflow-x-auto">
                                        {JSON.stringify({
                                            'Content-Type': 'application/json',
                                            'x-api-key': 'YOUR_API_KEY'
                                        }, null, 2)}
                                    </pre>
                                </div>

                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold mb-2 text-gray-300">Request Body:</h4>
                                    <pre className="bg-gray-900/50 p-3 rounded overflow-x-auto">
                                        {JSON.stringify({
                                            url: "https://example.com"
                                        }, null, 2)}
                                    </pre>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold mb-2 text-gray-300">Example Response:</h4>
                                    <pre className="bg-gray-900/50 p-3 rounded overflow-x-auto">
                                        {JSON.stringify({
                                            title: "Example Title",
                                            description: "Example description",
                                            favicon: "https://example.com/favicon.ico",
                                            ogImage: "https://example.com/og-image.jpg",
                                            url: "https://example.com",
                                            siteName: "Example Site",
                                            type: "website"
                                        }, null, 2)}
                                    </pre>
                                </div>

                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold mb-2 text-gray-300">Example Usage (curl):</h4>
                                    <pre className="bg-gray-900/50 p-3 rounded overflow-x-auto text-sm">
{`curl -X POST ${import.meta.env.VITE_BACKEND_URL}/preview \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{"url": "https://example.com"}'`}
                                    </pre>
                                </div>

                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold mb-2 text-gray-300">Example Usage (JavaScript):</h4>
                                    <pre className="bg-gray-900/50 p-3 rounded overflow-x-auto text-sm">
{`const response = await fetch('${import.meta.env.VITE_BACKEND_URL}/preview', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com'
  })
});

const data = await response.json();`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;