import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CityContext } from '../context/CityContext';
import SideNav from '../components/SideNav';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

function AddProductPage() {

  const location = useLocation();
  const session = location.state?.session;

  if (!session) {
    return <Navigate to="/login" />;
  }
  const { user } = session;
  const { selectedCity } = useContext(CityContext);
  const [product, setProduct] = useState({
    id: '',
    city: selectedCity, 
    productName: '',
    price: '',
    image: null,
    description: '',
    condition: '',
    productOwner: user.id,
    category: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' && value < 0) {
      return; 
    }
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('city', product.city);
    formData.append('productName', product.productName);
    formData.append('price', product.price);
    if (product.image) {
      formData.append('image', product.image);
    }
    formData.append('description', product.description);
    formData.append('condition', product.condition);
    formData.append('category', product.category);
    formData.append('productOwner', product.productOwner);

    axios.post('https://community-forum-backend.adaptable.app/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Product submitted: ', response.data);
        // Reset form fields
        setProduct({
          id: user.id,
          city: selectedCity, 
          productName: '',
          price: '',
          image: null,
          description: '',
          condition: '',
          productOwner: user.id,
          category: ''
        });
      
        navigate(`/all-products/city/${selectedCity}`);
      })
      .catch(error => {
        console.error('There was an error submitting the product!', error);
      });
  };

  return (
    <div className="mx-auto p-6 shadow-md rounded-lg flex"> 
      <div className="w-1/8">
        <SideNav />
      </div>
      <div className="w-3/4 p-4 mx-auto p-6 bg-white shadow-md rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Add New Product Listing Here</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={product.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 text-left">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                placeholder="e.g. Bosch Washing Machine"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 text-left">Price: €</label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-left">Description:</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="e.g. Only used for one year, works perfectly well with very minimal noise"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 text-left">Category:</label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
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
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 text-left">Condition:</label>
              <select
                id="condition"
                name="condition"
                value={product.condition}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a condition</option>
                <option value="New">New</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Satisfactory">Satisfactory</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 text-left">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-firstcolor file:bg-secondcolor hover:file:bg-thirdcolor"
              />
            </div>
            <button
              type="submit"
              className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondcolor hover:bg-thirdcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fifthcolor"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
