import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext';
import { IoIosPricetags } from "react-icons/io";
import { TbBox } from "react-icons/tb";
import { MdCategory } from "react-icons/md";

function AllProductsPage({ session }) {
    const { selectedCity } = useContext(CityContext);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [conditionFilter, setConditionFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { city } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://community-forum-backend.adaptable.app/product/city/${city}`);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, [city]);

    useEffect(() => {
        applyFilters();
    }, [categoryFilter, conditionFilter, searchTerm, products]);

    const applyFilters = () => {
        let filtered = products.filter(product => {
            if (product.city !== selectedCity) return false;
            if (categoryFilter && product.category !== categoryFilter) return false;
            if (conditionFilter && product.condition !== conditionFilter) return false;
            if (searchTerm && !product.productName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });
        setFilteredProducts(filtered);
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
                <h2 className="text-2xl font-bold mb-4">All Items For Sale In {selectedCity}</h2>
                <div className="flex mb-4 gap-2">
                    <input
                        type="text"
                        placeholder="Search product"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                    />

                    <Link to={`/city/${selectedCity}/add-product`} state={{ session }}
                        className="mt-auto bg-secondcolor hover:bg-thirdcolor text-white px-4 py-2 rounded-md ">Add New
                        Product</Link>
                </div>
                <div className="flex mb-4">
                    <select
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                        className="w-1/2 p-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                    >
                        <option value="">All Categories</option>
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
                    <select
                        value={conditionFilter}
                        onChange={e => setConditionFilter(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                    >
                        <option value="">All Conditions</option>
                        <option value="New-with-tags">New</option>
                        <option value="Very Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Satisfactory">Satisfactory</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product._id} className={`relative ${product.reservedById ? 'opacity-50 pointer-events-none' : ''}`}>
                                <Link to={`/all-products/city/${selectedCity}/product/${product._id}`} state={{ session }}
                                    className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between text-black">
                                    <div>
                                        <img className="w-full h-50 object-cover mb-2 rounded-lg" src={product.image}
                                            alt={product.productName} />
                                        <h3 className="text-xl text-firstcolor font-semibold mb-2 text-left">{product.productName}</h3>
                                        <p className="flex text-firstcolor mb-2 text-left"><IoIosPricetags className="m-1 text-thirdcolor" /> € {product.price}.00</p>
                                        <p className="flex text-firstcolor mb-2 text-left"><TbBox className="m-1 text-thirdcolor" />{product.condition}</p>
                                        <p className="flex text-firstcolor mb-2 text-left"><MdCategory className="m-1 text-thirdcolor" />{product.category}</p>
                                    </div>
                                    {product.reservedById && (
                                        <span className="absolute top-0 left-0 bg-gray-200 text-firstcolor px-2 py-1 rounded-br-lg">Reserved</span>
                                    )}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No products found for {selectedCity}.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllProductsPage;