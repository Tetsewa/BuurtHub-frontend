import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CityContext } from '../context/CityContext';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';

function AddEventPage() {
  const { selectedCity } = useContext(CityContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    city: selectedCity,
    address: '',
    location: {
      coordinates: {
        latitude: '',
        longitude: ''
      }
    },
    image: null,
    description: '',
    organiser: '',
    category: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'latitude' || name === 'longitude') {
      setEvent((prevEvent) => ({
        ...prevEvent,
        location: {
          coordinates: {
            ...prevEvent.location.coordinates,
            [name]: value
          }
        }
      }));
    } else {
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", event.title);
      formData.append("date", event.date);
      formData.append("time", event.time);
      formData.append("city", event.city);
      formData.append("location[type]", "Point");
      formData.append("location[coordinates][latitude]", event.location.coordinates.latitude);
      formData.append("location[coordinates][longitude]", event.location.coordinates.longitude);
      formData.append("image", event.image);
      formData.append("description", event.description);
      formData.append("organiser", event.organiser);
      formData.append("category", event.category);
      formData.append("address", event.address);
      formData.append("price", event.price);
      await axios.post('https://community-forum-backend.adaptable.app/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEvent({
        title: '',
        date: '',
        time: '',
        city: selectedCity,
        address: '',
        location: {
          coordinates: {
            latitude: '',
            longitude: ''
          }
        },
        image: null,
        description: '',
        organiser: '',
        category: '',
        price: '',
      });
      navigate(`/all-events/city/${selectedCity}`);
    } catch (error) {
      console.error('There was an error submitting the event!', error);
    }
  };

  return (
    <div className="mx-auto p-6  shadow-md rounded-lg flex">
      <div className="w-1/8">
        <SideNav />
      </div>
      <div className="w-3/4 p-4 mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Event in {event.city}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "title", type: "text", label: "Title", value: event.title },
            { id: "date", type: "date", label: "Date", value: event.date },
            { id: "time", type: "time", label: "Time", value: event.time },
            { id: "address", type: "text", label: "Address", value: event.address },
            { id: "description", type: "textarea", label: "Description", value: event.description },
            { id: "organiser", type: "text", label: "Organiser", value: event.organiser },
          ].map(({ id, type, label, value }) => (
            <div key={id} className="form-group flex items-center">
              <label htmlFor={id} className="w-1/4 text-sm font-medium text-gray-700">{label}:</label>
              {type === "textarea" ? (
                <textarea id={id} name={id} value={value} onChange={handleChange}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              ) : (
                <input id={id} type={type} name={id} value={value} onChange={handleChange}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              )}
            </div>
          ))}
          <div className="form-group flex items-center">
            <label htmlFor="latitude" className="w-1/4 text-sm font-medium text-gray-700">Latitude:</label>
            <input id="latitude" type="text" name="latitude" value={event.location.coordinates.latitude} onChange={handleChange}
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="form-group flex items-center">
            <label htmlFor="longitude" className="w-1/4 text-sm font-medium text-gray-700">Longitude:</label>
            <input id="longitude" type="text" name="longitude" value={event.location.coordinates.longitude} onChange={handleChange}
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="form-group flex items-center">
            <label htmlFor="category" className="w-1/4 text-sm font-medium text-gray-700">Category:</label>
            <select id="category" name="category" value={event.category} onChange={handleChange}
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="">Select a category</option>
              <option value="Art and Culture">Art and Culture</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Community & Environment">Community & Environment</option>
              <option value="Career">Career</option>
            </select>
          </div>
          <div className="form-group flex items-center">
            <label htmlFor="price" className="w-1/4 text-sm font-medium text-gray-700">Price:</label>
            <select id="price" name="price" value={event.price} onChange={handleChange}
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="">Select price option</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="form-group flex items-center">
            <label htmlFor="image" className="w-1/4 text-sm font-medium text-gray-700">Image:</label>
            <input id="image" name="image" type="file" onChange={handleImageChange} accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-firstcolor file:text-firstcolor hover:file:bg-sixthcolor" />
          </div>
          <button type="submit"
             className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondcolor hover:bg-thirdcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fifthcolor">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEventPage;
