import React from 'react';

function FAQPage() {
  return (
    <div className=" min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">What is BuurtHub?</h3>
            <p>BuurtHub is a community platform designed to connect neighbors, facilitate local exchanges of goods and services, and promote community engagement through events and discussions.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-xl font-semibold mb-2">How do I sign up for BuurtHub?</h3>
            <p>To sign up for BuurtHub, click on the "Sign Up" button at the top right corner of the homepage. Enter your email address and create a password, or connect with your existing Google account  to get started.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Using BuurtHub</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">How do I post a product for sale?</h3>
            <p>To post a product for sale, go to the products section. Click on the "Add New Product" button, fill out the product details including name, description, price, and category, and then upload an image if available. Click "Submit" to list your item. You can view the list of added products in the user dashboard by clicking the user icon .</p> 
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-xl font-semibold mb-2">How can I join a community event?</h3>
            <p>To join a community event, navigate to the Events section. Browse through the upcoming events, click on the event you are interested in, and then register. You will receive an email confirmation with the details and instructions needed.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Safety and Privacy</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Is my personal information secure on BuurtHub?</h3>
            <p>Yes, BuurtHub takes user privacy and security seriously. We use industry-standard encryption protocols to protect your personal information. Your data will not be shared with third parties without your consent.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-xl font-semibold mb-2">What measures does BuurtHub take to ensure user safety?</h3>
            <p>BuurtHub encourages users to practice safe interactions within the community. We provide reporting and moderation tools to address any inappropriate behavior or content. Please read our community guidelines for more information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
