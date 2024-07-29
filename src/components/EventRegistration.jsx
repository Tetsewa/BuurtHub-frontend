import React, { useState } from 'react';
import axios from 'axios';

const EventRegistration = ({ eventId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://community-forum-backend.adaptable.app/event/${eventId}/register`, {
        name,
        email,
      });
      setName('');
      setEmail('');
      alert('Registration successful!');
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4">Register for Event</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;
