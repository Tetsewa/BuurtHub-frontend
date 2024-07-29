import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import { IoTicket } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";


function AllEventsPage({ session }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedCity } = useContext(CityContext);
  const { city } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/city/${city}`);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, [selectedCity]);

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, searchTerm]);

  const applyFilters = () => {
    let filtered = events.filter(event => {
      if (categoryFilter && event.category !== categoryFilter) return false;
      if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
    setFilteredEvents(filtered);
  };

  if (!session) {
    return <Navigate to="/login" />;
  }

  const { user } = session;

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events in {selectedCity}</h2>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Search event"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          />
          <Link to={`/city/${selectedCity}/add-event`} state={{ session }} className="mt-auto bg-secondcolor hover:bg-thirdcolor text-white px-4 py-2 rounded-md">
            Add New Event
          </Link>
        </div>
        <div className="flex mb-4">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          >
            <option value="">All Categories</option>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link to={`/all-events/city/${selectedCity}/event/${event._id}`} key={event._id} state={{ session }} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">

                {event.image && (
                  <img src={event.image} alt={event.title} className="w-full h-40 object-cover mb-2 rounded-lg" />
                )}
                <h3 className="text-xl text-firstcolor font-semibold mb-2 text-left">{event.title}</h3>
                <p className="flex text-firstcolor mb-2 text-left"><BsCalendar2DateFill className="m-1 text-thirdcolor" />{new Date(event.date).toLocaleDateString()}</p>
                <p className="flex text-firstcolor mb-2 text-left"><IoIosTime className="m-1 text-thirdcolor" />{event.time}</p>
                <p className="flex text-firstcolor mb-2 text-left"><MdCategory className="m-1 text-thirdcolor" />{event.category}</p>
                <p className="flex text-firstcolor mb-2 text-left"><IoTicket className="m-1 text-thirdcolor" />{event.price}</p>
                <p className="flex text-firstcolor mb-2 text-left"><FaLocationDot className="m-1 text-thirdcolor" />{event.address}</p>
                <p className="text-white font-bold mb-2 text-left bg-firstcolor px-4 py-2 rounded-md w-full">Hosted by:  {event.organiser}</p>
                


              </Link>
            ))
          ) : (
            <p>No events found for {selectedCity}.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllEventsPage;
