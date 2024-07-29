import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

function LogInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate(redirectTo);
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.error('Error signing in with Google:', error.message);
            setError(error.message);
        } else {
            navigate(redirectTo); // Navigate to your dashboard or desired route
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
            <div className="absolute inset-0">
                <div className="h-full w-full bg-center bg-cover" style={{ backgroundImage: 'url(/bg-pic.jpg)', filter: 'blur(3px)' }}></div>
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div> {/* Optional overlay for better contrast */}
            </div>
            <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src="/b-logo.png" alt="Logo" className="h-16 w-auto" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-center">Log In Here</h1>
                </div>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={email}
                            type="email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={password}
                            type="password"
                        />
                    </div>
                    <button
                        className="w-full px-3 py-2 bg-secondcolor hover:bg-thirdcolor text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account yet? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up here</Link>
                </p>
                <div className="flex justify-center w-full mt-4">
                    <GoogleButton
                        className="text-center mr-4 "
                        onClick={handleGoogleSignIn}
                    />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
}

export default LogInPage;
