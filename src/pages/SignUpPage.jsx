import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const handleName = (e) => {
        setFullName(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
            setError(true);
            setPasswordError(false);
        } else if (password !== confirmPassword) {
            setPasswordError(true);
            setError(false);
        } else {
            setSubmitted(true);
            setError(false);
            setPasswordError(false);
        }
    };

    const successMessage = () => {
        return (
            <div
                className="text-green-500 mb-4"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>User {fullName} successfully registered!!</h1>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="text-red-500 mb-4"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h3>Please enter all the fields</h3>
            </div>
        );
    };

    const passwordErrorMessage = () => {
        return (
            <div
                className="text-red-500 mb-4"
                style={{
                    display: passwordError ? "" : "none",
                }}
            >
                <h3>Passwords do not match</h3>
            </div>
        );
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullName,
                    avatar: "",
                },
            },
        });

        if (error) {
            setError(error.message);
        } else {
            console.log('User:', data.user);
            navigate('/login');
        }

        setLoading(false);
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
                    <h1 className="text-2xl font-bold mb-4 text-center">Sign Up Here</h1>
                </div>

                <div className="messages">
                    {errorMessage()}
                    {passwordErrorMessage()}
                    {successMessage()}
                </div>

                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            onChange={handleName}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={fullName}
                            type="text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            onChange={handleEmail}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={email}
                            type="email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password (min 8 characters)</label>
                        <input
                            onChange={handlePassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={password}
                            type="password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            onChange={handleConfirmPassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={confirmPassword}
                            type="password"
                        />
                    </div>

                    <button
                        className="w-full px-3 py-2 bg-secondcolor hover:bg-thirdcolor text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
