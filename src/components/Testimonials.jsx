// Testimonials.js
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Janneke Veenstra",
    text: "BuurtHub has really improved the way I engage with my community. I’ve made new friends and discovered so many local events!"
  },
  {
    id: 2,
    name: "Fleur van Dijk",
    text: "I love the marketplace feature on BuurtHub. It’s so easy to buy and sell items within my neighborhood. And I get to connect with them"
  },
  {
    id: 3,
    name: "Rik Heemstra",
    text: "The event organization on BuurtHub is fantastic. I’ve attended several events and they were all amazing."
  },
];

function Testimonials() {
  return (
    <div className="text-firstcolor py-8">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold mb-4">What Users Say About BuurtHub</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className='flex justify-start'><img className="w-16 h-16 rounded-full " src= "quote-up.png" alt="quote-up" /></div>
            <h3 className="text-xl font-semibold mb-2 text-center">{testimonial.name}</h3>
            <p className="text-gray-600 text-center">{testimonial.text}</p>
            <div className='flex justify-end'><img className="w-16 h-16 rounded-full " src= "quote-down.png" alt="quote-down" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
