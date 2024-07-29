import axios from 'axios';

async function geocodeAddress(address) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return location; // { lat: ..., lng: ... }
    } else {
      throw new Error('Geocoding failed');
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}
