import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CityContext } from '../context/CityContext';
import { supabase } from '../supabaseClient';

function CitySelection() {
  const { selectedCity, setSelectedCity } = useContext(CityContext);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const session = supabase.auth.getSession();

  useEffect(() => {
    axios.get('https://community-forum-backend.adaptable.app/city')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cities!', error);
      });
  }, []);

  const handleSelectCity = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    if (selectedCity) {
      if (session) {
        navigate(`/city/${selectedCity}`);
      } else {
        navigate('/login', { state: { from: `/city/${selectedCity}` } });
      }
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <label htmlFor="city-select" className="block text-lg font-semibold mb-2">Select Your City</label>
        <select
          id="city-select"
          name="city-select"
          className="select-style w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSelectCity}
        >
          <option value="">Select your city</option>
          {cities.map(city => (
            <option key={city._id} value={city.cityname}>{city.cityname}</option>
          ))}
        </select>
      </div>
      {/* {selectedCity && <p className="text-lg">You selected: {selectedCity}</p>} */}
    </div>
  );
}

export default CitySelection;
