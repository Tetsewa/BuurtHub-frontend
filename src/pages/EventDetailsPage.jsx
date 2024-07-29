import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';
import { IoTicket } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillInfoCircleFill } from "react-icons/bs";


const EventDetailsPage = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const session = location.state?.session;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentParticipants, setCurrentParticipants] = useState([]);
  const { user } = session;
  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/${eventId}`);
        setEvent(response.data);
        setCurrentParticipants(response.data.participants);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch event details', error);
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId, session]);
  const handleRegister = async (e) => {
    e.preventDefault();
    const confirmRegister = window.confirm("Do you want to register for this Event?");
    if (confirmRegister) {
      console.log('Register EVENT ID :: ' + user.id);
      const updateData = {
        participants: Array.isArray(currentParticipants) ? [...currentParticipants, user.id] : [user.id],
      };
      const userEmail ={
        email: user.email,
      };
      try {
        await axios.put(`https://community-forum-backend.adaptable.app/event/register/${eventId}`, updateData);
        toast.success('Successfully registered for the event');
        await axios.post(`https://community-forum-backend.adaptable.app/email/sendemail`, userEmail);
      } catch (error) {
        console.error('Failed to register for event', error);
        // toast.error('Failed to register for event');
      }
    }
  };
  if (!session) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    toast.error(error);
    return <div>Error loading event details</div>;
  }
  if (!event) {
    return <div>No event found</div>;
  }
  const {
    title,
    description,
    date,
    time,
    city,
    address,
    locationUrl,
    organiser,
    price,
    category,
    image,
    location: eventLocation
  } = event;
  const hasLocation = eventLocation && eventLocation.coordinates && eventLocation.coordinates.latitude && eventLocation.coordinates.longitude;
  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <div className="flex">
          <div className="w-1/3">
            {event.image && (
              <img className="w-full h-100 object-cover mb-4" src={event.image} alt={event.title} />
            )}
          </div>
          <div className="w-2/3 pl-4">
            <p className="flex text-firstcolor mb-4"><BsFillInfoCircleFill className="m-1 text-thirdcolor" />{event.description}</p>
            <p className="flex text-firstcolor mb-2 text-left"><BsCalendar2DateFill className="m-1 text-thirdcolor" />{new Date(event.date).toLocaleDateString()}</p>
            <p className="flex text-firstcolor mb-2 text-left"><IoIosTime className="m-1 text-thirdcolor" />{event.time}</p>

            <p className="flex text-firstcolor mb-2 text-left hover:underline"><FaLocationDot className="m-1 text-thirdcolor" /><a href={event.locationUrl} target="_blank"
              rel="noopener noreferrer">{address}</a>
            </p>

            <p className="flex text-firstcolor mb-2 text-left"><IoTicket className="m-1 text-thirdcolor" />{event.price}</p>
            <p className="flex text-firstcolor mb-2 text-left"><MdCategory className="m-1 text-thirdcolor" />{event.category}</p>
            <p className="text-white font-bold mb-2 text-left bg-firstcolor px-4 py-2 rounded-md w-1/2">Hosted by:  {event.organiser}</p>
            <button onClick={handleRegister} className="bg-secondcolor hover:bg-thirdcolor text-white p-2 rounded-md w-1/4">Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDetailsPage;
