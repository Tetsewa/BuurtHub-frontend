import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SideNav from "../components/SideNav";
import { CityContext } from '../context/CityContext';
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BsFillSendExclamationFill } from "react-icons/bs";

function AllPostsPage({ session }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedCity } = useContext(CityContext);
  const { city } = useParams();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://community-forum-backend.adaptable.app/posts/city/${city}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [city]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.postAuthor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (!session) {
    return <Navigate to="/login" />;
}
const { user } = session;

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      {/* <p>User ID: {user.id}</p> */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">All Posts From The {selectedCity} Community</h2>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          />
          <Link
            to={`/city/${selectedCity}/add-post`} state={{ session }}
            className="bg-secondcolor text-white px-4 py-2 rounded-md hover:bg-thirdcolor"
          >
            Add New Post
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
              <img className="w-full h-50 object-cover mb-2 rounded-lg" src={post.image} alt={post.title} />
                <h3 className="text-xl font-semibold mb-2 text-left">{post.title}</h3>
                <p className="flex text-firstcolor mb-2"><BsFillChatSquareTextFill className="m-1 text-thirdcolor"/>{post.content}</p>
                <p className="flex text-firstcolor mb-2"><BsCalendar2DateFill className="m-1 text-thirdcolor" />{new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="flex text-firstcolor mb-2"><BsFillSendExclamationFill className="m-1 text-thirdcolor"/> {post.contactInfo}</p>
                
              </div>
            ))
          ) : (
            <p>No posts found for {selectedCity}.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPostsPage;
