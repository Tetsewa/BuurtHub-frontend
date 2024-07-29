import React from 'react';

function PrivacyPolicyPage() {
  return (
    <div className=" min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>Welcome to BuurtHub's Privacy Policy. Your privacy is important to us. It is BuurtHub's policy to respect your privacy regarding any information we may collect from you across our website, <a href="/">https://buurt-hub.vercel.app</a>, and other sites we own and operate.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to improve our services.</p>
          <p>The types of information that we collect may include:</p>
          <ul className="list-none pl-6 mt-2">
            <li>Contact Information (such as name, email address)</li>
            <li>Demographic Information (such as age, gender, location)</li>
            <li>Usage Data (such as IP address, browser type, pages visited)</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-none pl-6 mt-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Communicate with you, either directly or through one of our partners</li>
            <li>Enforce our terms, conditions, and policies</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Security of Your Information</h2>
          <p>We take appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul className="list-none pl-6 mt-2">
            <li>Email: info@buurthub.com</li>
            <li>Phone: +31 2564 8550 62</li>
            <li>Address: AB Lincolnstraat 4, 6852 AB, Amsterdam</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
