import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AllTopicPage from './pages/AllTopicPage';
import AllProductsPage from './pages/AllProductsPage';
import AllEventsPage from './pages/AllEventsPage';
import Dashboard from './pages/Dashboard';
import AddProductPage from './pages/AddProductPage';
import AddEventPage from './pages/AddEventPage';
import AddPostPage from './pages/AddPostPage';
import AddTopicPage from './pages/AddTopicPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CitySelection from './components/CitySelection';
import UserCityPage from './pages/UserCityPage';
import AllPostsPage from './pages/AllPostsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutUs from './pages/AboutUs';
import TermsOfService from './pages/Terms';
import FAQPage from './pages/FAQ';
import PrivacyPolicyPage from './pages/Privacy';
import { CityProvider } from './context/CityContext';
import { supabase } from './supabaseClient';

function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <CityProvider>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='/terms-of-service' element={<TermsOfService />} />
                <Route path='/FAQ' element={<FAQPage />} />
                <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                
                
                {session ? (
                    <>
                        <Route path='/dashboard' element={<Dashboard key={session.user.id} session={session} />} />
                        <Route path='/city/:city/add-product' element={<AddProductPage key={session.user.id} session={session} />} />
                        <Route path='/city/:city/add-event' element={<AddEventPage key={session.user.id} session={session} />} />
                        <Route path='/city/:city/add-post' element={<AddPostPage key={session.user.id} session={session} />} />
                        <Route path='/city/:city/add-topic' element={<AddTopicPage key={session.user.id} session={session} />} />
                        <Route path='/topics/city/:city' element={<AllTopicPage session={session} />} />
                        <Route path='/all-events/city/:city' element={<AllEventsPage session={session} />} />
                        <Route path='/all-events/city/:city/event/:eventId' element={<EventDetailsPage key={session.user.id} session={session}/>} />
                        <Route path='/all-products/city/:city/product/:productId' element={<ProductDetailsPage session={session} />} />
                        <Route path='/all-products/city/:city' element={<AllProductsPage key={session.user.id} session={session} />} />
                        <Route path='/city' element={<CitySelection />} />
                        <Route path='/city/:city' element={<UserCityPage key={session.user.id} session={session}/>} />
                        <Route path='/all-posts/city/:city' element={<AllPostsPage key={session.user.id} session={session} />} />
                        
                        <Route path='*' element={<div>404 Page Not Found 😞</div>} />
                    </>
                ) : (
                    <Route path='*' element={<Navigate to='/login' />} />
                )}
            </Routes>
            <Footer />
        </CityProvider>
    );
}

export default App;
