import React, { useEffect } from 'react';
import CitySelection from '../components/CitySelection';
import Testimonials from '../components/Testimonials';

function HomePage() {
  useEffect(() => {
    // Function to animate each step
    function animateSteps() {
      const steps = document.querySelectorAll('.step');
      let delay = 0;

      steps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.remove('hidden');
          step.classList.add('animate__animated', 'animate__fadeInUp'); // Add your animation class here
        }, delay);
        delay += 500; // Adjust this value for the desired animation delay
      });
    }

    // Call the function to start animating steps after the page has loaded
    animateSteps();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="min-h-screen">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to BuurtHub!</h1>
      </div>
      <div className="bg-cover bg-center py-16" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
        <div className="bg-white bg-opacity-75 py-8 px-4 max-w-md mx-auto rounded-lg shadow-lg">
          <CitySelection />
        </div>
      </div>
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Why Register on BuurtHub?</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <section className="benefits bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img className="w-full h-48 center rounded-t-lg" src='/events.jpg' alt='events' />
          <h3 className="text-xl font-semibold mt-4">Stay Informed and Engaged with Community Events</h3>
          <p className="mt-2"><b>BuurtHub</b> keeps you up-to-date with the latest events and activities in your community. Easily sign up for upcoming community events and also stay informed about important announcements from community.</p>
        </section>
        <section className="benefits bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/discussion.jpg' alt='discussion' />
          <h3 className="text-xl font-semibold mt-4">Make Posts and Build Connections</h3>
          <p className="mt-2"><b>BuurtHub</b> provides a platform which allows users to make posts about things in the community. From neighborhood safety to local businesses, share your thoughts and hear from others.</p>
        </section>
        <section className="benefits bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img className="w-full h-48 object-cover rounded-t-lg" src='/marketplace.jpg' alt='marketplace' />
          <h3 className="text-xl font-semibold mt-4">Utilize the Marketplace for Goods and Services</h3>
          <p className="mt-2"><b>BuurtHub</b> provides a convenient marketplace to buy, sell, give away items, and offer or request services, fostering recycling, savings, and local economic support.</p>
        </section>
      </div>
      <Testimonials />
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">How BuurtHub Works</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center px-4">
        {/* <div className="md:w-1/2 mb-4 md:mb-0">
          <img src="/How_it_works.gif" alt="How it works" className="w-full h-auto rounded-lg shadow-lg" />
        </div> */}
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" id="buurthub-steps" style={{ height: '550px' }}>
          <div className="flex flex-col space-y-4">
            <div className="step border-b border-gray-200 pb-4 hidden">
              <h4 className="text-base font-semibold mb-2">1. Create an account using your email address or connect with your existing Google account</h4>
            </div>
            <div className="step border-b border-gray-200 pb-4 hidden">
              <h4 className="text-base font-semibold mb-2">2. Browse through a wide range of products from various categories listed by your neighbours and add your own products for sale or give away</h4>
            </div>
            <div className="step border-b border-gray-200 pb-4 hidden">
              <h4 className="text-base font-semibold mb-2">3. Reserve and pick up items that you reserve</h4>
            </div>
            <div className="step border-b border-gray-200 pb-4 hidden">
              <h4 className="text-base font-semibold mb-2">4. Register for an event or also add event</h4>
            </div>
            <div className="step pb-4 hidden">
              <h4 className="text-base font-semibold mb-2">5. Use the platform to share important announcements, news, or requests with your community</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
