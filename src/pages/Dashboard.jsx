import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext';
import { IoIosPricetags } from "react-icons/io";
import { TbBox } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { BsFillSendExclamationFill } from "react-icons/bs";

function UserDashboard({ session }) {
  const [userProducts, setUserProducts] = useState([]);
  const [reservedProducts, setReservedProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const { selectedCity } = useContext(CityContext);

  const { user } = session;
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/registeredevents/${user.id}`);
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchRegisteredEvents();
  }, [user.id]);



  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/product/productowner/${user.id}`);
        setUserProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchUserProducts();
  }, [user.id]);

  useEffect(() => {
    const fetchUserReservedProducts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/product/reservedproducts/${user.id}`);
        setReservedProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchUserReservedProducts();
  }, [user.id]);

  useEffect(() => {
    const fetchUserFavouriteProducts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/product/favouriteproducts/${user.id}`);
        setFavouriteProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch favourite products', error);
      }
    };
    fetchUserFavouriteProducts();
  }, [user.id]);


  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/posts/postauthor/${user.id}`);
        setUserPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };
    fetchUserPosts();
  }, [user.id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePostEditChange = (e) => {
    const { name, value } = e.target;
    setEditPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://community-forum-backend.adaptable.app/product/${editProduct._id}`, editProduct);
      toast.success('Product updated successfully');
      setUserProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === editProduct._id ? response.data : product
        )
      );
      setEditProduct(null);
    } catch (error) {
      toast.error('Failed to update product');
      console.error('Failed to update product', error);
    }
  };

  const handlePostEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://community-forum-backend.adaptable.app/posts/postauthor/${editPost._id}`, editPost);
      toast.success('Post updated successfully');
      setUserPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === editPost._id ? response.data : post
        )
      );
      setEditPost(null);
    } catch (error) {
      toast.error('Failed to update post');
      console.error('Failed to update post', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://community-forum-backend.adaptable.app/product/${productId}`);
      toast.success('Product deleted successfully');
      setUserProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Failed to delete product', error);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      await axios.delete(`https://community-forum-backend.adaptable.app/posts/postauthor/${postId}`);
      toast.success('Post deleted successfully');
      setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      toast.error('Failed to delete post');
      console.error('Failed to delete post', error);
    }
  };

  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-1/8">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-4xl font-bold mb-4">User Dashboard</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">My Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userProducts.length > 0 ? (
              userProducts.map(product => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md relative">
                  {editProduct && editProduct._id === product._id ? (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-firstcolor">Name:</label>
                        <input
                          name="productName"
                          value={editProduct.productName}
                          onChange={handleEditChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-firstcolor">Description:</label>
                        <textarea
                          name="description"
                          value={editProduct.description}
                          onChange={handleEditChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-firstcolor">Price:</label>
                        <input
                          name="price"
                          type="number"
                          value={editProduct.price}
                          onChange={handleEditChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-firstcolor">Category:</label>
                        <select
                          name="category"
                          value={editProduct.category}
                          onChange={handleEditChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a category</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Utensils">Utensils</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Kids">Kids</option>
                          <option value="Pet Care">Pet Care</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Sports">Sports</option>
                          <option value="Appliances">Appliances</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-firstcolor">Condition:</label>
                        <select
                          name="condition"
                          value={editProduct.condition}
                          onChange={handleEditChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a condition</option>
                          <option value="New">New</option>
                          <option value="Very Good">Very Good</option>
                          <option value="Good">Good</option>
                          <option value="Satisfactory">Satisfactory</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-firstcolor hover:bg-fifthcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditProduct(null)}
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col h-full">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="mt-2 rounded-lg "
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      )}
                      <h4 className="text-lg font-semibold mb-2 text-left">{product.productName}</h4>
                      <p className="flex text-firstcolor mb-2 text-left">
                        <IoIosPricetags className="m-1 text-thirdcolor" /> € {product.price}.00
                      </p>
                      <p className="flex text-firstcolor text-left mb-4">
                        <BsFillInfoCircleFill className="m-1 text-thirdcolor" /> {product.description}
                      </p>
                      <p className="flex text-firstcolor mb-2 text-left">
                        <MdCategory className="m-1 text-thirdcolor" /> {product.category}
                      </p>
                      <p className="flex text-firstcolor mb-2 text-left">
                        <TbBox className="m-1 text-thirdcolor" /> {product.condition}
                      </p>

                      <div className="mt-auto flex space-x-2">
                        <button
                          onClick={() => setEditProduct(product)}
                          className="py-1 px-3 w-1/2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-firstcolor hover:bg-fifthcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="py-1 px-3 w-1/2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  )}
                </div>
              ))
            ) : (
              <p>No products added by you.</p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">My Reserved Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reservedProducts.length > 0 ? (
              reservedProducts.map(product => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  {product.image && (
                    <img src={product.image} alt={product.productName} className="mt-4 rounded-md"
                      style={{ maxWidth: '100%', height: 'auto' }} />
                  )}
                  <h4 className="text-lg font-semibold mb-2 text-left">{product.productName}</h4>
                  <p className="flex text-firstcolor mb-2 text-left"><IoIosPricetags className="m-1 text-thirdcolor" /> € {product.price}.00</p>
                  <p className="flex text-firstcolor mb-4"><BsFillInfoCircleFill className="m-1 text-thirdcolor" />{product.description}</p>
                  <p className="flex text-firstcolor mb-2 text-left"><MdCategory className="m-1 text-thirdcolor" />{product.category}</p>
                  <p className="flex text-firstcolor mb-2 text-left"><TbBox className="m-1 text-thirdcolor" />{product.condition}</p>

                </div>
              ))
            ) : (
              <p>No reserved products.</p>
            )}
          </div>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">My Favourite Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favouriteProducts.length > 0 ? (
              favouriteProducts.map(product => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <Link to={`/all-products/city/${selectedCity}/product/${product._id}`} state={{ session }}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between text-black">
                    {product.image && (<img src={product.image} alt={product.productName} className="mt-4 rounded-md" style={{ maxWidth: '100%', height: 'auto' }} />)}
                    <h4 className="text-lg font-semibold mb-2 text-left">{product.productName}</h4>
                    <p className="flex text-firstcolor mb-2 text-left"><IoIosPricetags className="m-1 text-thirdcolor" /> € {product.price}.00</p>
                    <p className="flex text-firstcolor mb-4 text-left"><BsFillInfoCircleFill className="m-1 text-thirdcolor" />{product.description}</p>
                    <p className="flex text-firstcolor mb-2 text-left"><MdCategory className="m-1 text-thirdcolor" />{product.category}</p>
                    <p className="flex text-firstcolor mb-2 text-left"><TbBox className="m-1 text-thirdcolor" />{product.condition}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No favourite products.</p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">My Registered Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {registeredEvents.length > 0 ? (
              registeredEvents.map(event => (
                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between ">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-t-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl text-firstcolor font-semibold mb-2 text-left">{event.title}</h3>
                  <p className="flex text-firstcolor mb-2 text-left">
                    <BsCalendar2DateFill className="m-1 text-thirdcolor" />
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="flex text-firstcolor mb-2 text-left">
                    <IoIosTime className="m-1 text-thirdcolor" />
                    {event.time}
                  </p>
                  <p className="flex text-firstcolor mb-2 text-left">
                    <MdCategory className="m-1 text-thirdcolor" />
                    {event.category}
                  </p>
                  <p className="flex text-firstcolor mb-2 text-left">
                    <IoTicket className="m-1 text-thirdcolor" />
                    {event.price}
                  </p>
                  <p className="flex text-firstcolor mb-2 text-left hover:underline">
                    <FaLocationDot className="m-1 text-thirdcolor" />
                    <a href={event.locationUrl} target="_blank" rel="noopener noreferrer">
                      {event.address}
                    </a>
                  </p>
                  <p className="text-white font-bold mb-2 text-left bg-firstcolor px-4 py-2 rounded-md w-full">
                    Hosted by: {event.organiser}
                  </p>
                </div>
              ))
            ) : (
              <p>No registered events.</p>
            )}
          </div>
        </section>


        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">My Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <div key={post._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full relative">
                  {editPost && editPost._id === post._id ? (
                    <form onSubmit={handlePostEditSubmit} className="space-y-4 flex-grow">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-firstcolor">Title:</label>
                        <input
                          name="title"
                          value={editPost.title}
                          onChange={handlePostEditChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-firstcolor">Content:</label>
                        <textarea
                          name="content"
                          value={editPost.content}
                          onChange={handlePostEditChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex-grow"></div>
                      <div className="flex flex-col space-y-2">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-firstcolor hover:bg-fifthcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditPost(null)}
                          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex-grow">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="mt-4 rounded-md"
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        )}
                        <h3 className="text-xl font-semibold mb-2 text-left">{post.title}</h3>
                        <p className="flex text-firstcolor mb-2">
                          <BsFillChatSquareTextFill className="m-1 text-thirdcolor" />
                          {post.content}
                        </p>
                        <p className="flex text-firstcolor mb-2">
                          <BsCalendar2DateFill className="m-1 text-thirdcolor" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        <p className="flex text-firstcolor mb-2">
                          <BsFillSendExclamationFill className="m-1 text-thirdcolor" />
                          {post.contactInfo}
                        </p>
                      </div>
                      <div className="flex-shrink-0 mt-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditPost(post)}
                            className="py-1 px-3 w-1/2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-firstcolor hover:bg-fifthcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handlePostDelete(post._id)}
                            className="py-1 px-3 w-1/2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No posts added by you.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default UserDashboard;

