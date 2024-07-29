import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext';
import { IoIosPricetags } from "react-icons/io";
import { TbBox } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { BsFillSendExclamationFill } from "react-icons/bs";

function UserCityPage() {
  const { city } = useParams();
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const { selectedCity, setSelectedCity } = useContext(CityContext);

  useEffect(() => {
    setSelectedCity(city);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/product/city/${city}`);
        setProducts(response.data.slice(-3));
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/city/${city}`);
        setEvents(response.data.slice(-3));
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/posts/city/${city}`);
        setPosts(response.data.slice(-3));
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchProducts();
    fetchEvents();
    fetchPosts();
  }, [city, setSelectedCity]);

  return (
    <div className="flex">
      <div className="w-1/8">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">Hi! Welcome to the {city} Community!</h1>
          <img className="w-full h-300 object-cover mb-4 shadow-md rounded-lg" src={`/cities/${city}.jpg`} alt={`${city}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Items for sale in the community</h2>
          <div className="flex justify-end">
            <Link 
              to={`/all-products/city/${selectedCity}`} 
              className="min-w-[200px] min-h-[60px] inline-flex items-center justify-center text-lg font-bold text-[#313133] bg-gradient-to-r from-[#81e6d9] to-[#4fd1c5] rounded-full shadow-custom transition-transform duration-300 ease-in-out relative p-2 hover:translate-y-[-6px] before:content-[''] before:absolute before:inset-0 before:min-w-[212px] before:min-h-[72px] before:border-6 before:border-[#00FFCB] before:shadow-glow before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100 after:content-[''] after:w-[30px] after:h-[30px] after:border-6 after:border-[#00FFCB] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:animation-ring hover:after:animation-none"
            >
              See all products
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img className="w-full h-50 object-cover mb-2 rounded-lg" src={product.image} alt={product.productName} />
                  <h3 className="text-xl font-semibold mb-2 text-left">{product.productName}</h3>
                  <p className="flex text-firtstcolor mb-2 text-left"><IoIosPricetags className="m-1 text-thirdcolor" /> € {product.price}.00</p>
                  <p className="flex text-firtstcolor mb-2 text-left"><TbBox className="m-1 text-thirdcolor" />{product.condition}</p>
                  <p className="flex text-firtstcolor mb-2 text-left"><MdCategory className="m-1 text-thirdcolor" />{product.category}</p>
                </div>
              ))
            ) : (
              <p>No products found for this city. </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-8">Upcoming Events in the community</h2>
          <div className="flex justify-end">
            <Link 
              to={`/all-events/city/${selectedCity}`} 
              className="min-w-[200px] min-h-[60px] inline-flex items-center justify-center text-lg font-bold text-[#313133] bg-gradient-to-r from-[#81e6d9] to-[#4fd1c5] rounded-full shadow-custom transition-transform duration-300 ease-in-out relative p-2 hover:translate-y-[-6px] before:content-[''] before:absolute before:inset-0 before:min-w-[212px] before:min-h-[72px] before:border-6 before:border-[#00FFCB] before:shadow-glow before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100 after:content-[''] after:w-[30px] after:h-[30px] after:border-6 after:border-[#00FFCB] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:animation-ring hover:after:animation-none"
            >
              See all events
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <img className="w-full h-40 object-cover mb-2 rounded-lg" src={event.image} alt={event.title} />
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="flex text-firstcolor mb-2 text-left"><BsCalendar2DateFill className="m-1 text-thirdcolor" />{new Date(event.date).toLocaleDateString()}</p>
                  <p className="flex text-firstcolor mb-2 text-left"><IoIosTime className="m-1 text-thirdcolor" />{event.time}</p>
                  <p className="flex text-firstcolor mb-2 text-left"><IoTicket className="m-1 text-thirdcolor" />{event.price}</p>
                  <p className="flex text-firstcolor mb-2 text-left"><FaLocationDot className="m-1 text-thirdcolor" />{event.address}</p>
                  <p className="text-white font-bold mb-2 text-left bg-firstcolor px-4 py-2 rounded-md w-full">Hosted by:  {event.organiser}</p>
                </div>
              ))
            ) : (
              <p>No events found for this city.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-8">Community Posts</h2>
          <div className="flex justify-end">
            <Link 
              to={`/all-posts/city/${selectedCity}`} 
              className="min-w-[200px] min-h-[60px] inline-flex items-center justify-center text-lg font-bold text-[#313133] bg-gradient-to-r from-[#81e6d9] to-[#4fd1c5] rounded-full shadow-custom transition-transform duration-300 ease-in-out relative p-2 hover:translate-y-[-6px] before:content-[''] before:absolute before:inset-0 before:min-w-[212px] before:min-h-[72px] before:border-6 before:border-[#00FFCB] before:shadow-glow before:rounded-full before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100 after:content-[''] after:w-[30px] after:h-[30px] after:border-6 after:border-[#00FFCB] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:animation-ring hover:after:animation-none"
            >
              See all posts
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <img className="w-full h-50 object-cover mb-2" src={post.image} alt={post.title} />
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  
                  <p className="flex text-firstcolor mb-2"><BsFillChatSquareTextFill className="m-1 text-thirdcolor"/>{post.content}</p>
                  <p className="flex text-gray-600 mb-2"><BsCalendar2DateFill className="m-1 text-thirdcolor" />{new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="flex text-firstcolor mb-2 "><BsFillSendExclamationFill className="m-1 text-thirdcolor"/>{post.contactInfo}</p>
                </div>
              ))
            ) : (
              <p>No posts found for {selectedCity}.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCityPage;
