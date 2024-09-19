import React from 'react';
import { FaDollarSign, FaHeadset, FaRocket,FaStar } from 'react-icons/fa'; // Import icons from react-icons

function Choseus() {
  const cardData = [
    {
      id: 1,
      title: "Best Prices",
      description: "We offer the most competitive prices on flights to destinations worldwide. Save more with our exclusive deals.",
      icon: <FaDollarSign className="text-blue-600 w-12 h-12 mb-4" />
    },
    {
      id: 2,
      title: "Exceptional Service",
      description: "Our customer service team is available 24/7 to assist you with any queries or issues. We are dedicated to providing excellent service.",
      icon: <FaHeadset className="text-blue-600 w-12 h-12 mb-4" />
    },
    {
      id: 3,
      title: "Easy Booking",
      description: "Our user-friendly platform makes booking your flights quick and easy. Enjoy a seamless booking experience with just a few clicks.",
      icon: <FaRocket className="text-blue-600 w-12 h-12 mb-4" />
    },
    {
        id: 4,
        title: "Trusted by Thousands",
        description: "Join millions of satisfied travelers who trust us to find the best flights. Our reputation for reliability and trustworthiness speaks for itself.",
        icon: <FaStar className="text-blue-600 w-12 h-12 mb-4" />
      }
  ];

  return (
    <section className="py-12 bg-gray-100 mb-8">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why You Chose Us</h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map(card => (
            <div key={card.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center w-full sm:w-80 md:w-72 lg:w-64 xl:w-70">
              {card.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  
  );
}

export default Choseus;
