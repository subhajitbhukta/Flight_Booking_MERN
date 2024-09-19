import React from 'react';

function TopAlinsCard(props) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-80 md:w-96 lg:w-full">
      <img className="w-full h-48 object-cover" src={props.imgSrc} alt="Top Airlines" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{props.heading1}</h2>
        <p className="text-gray-600 mb-4">{props.heading2}</p>
        <a href="#more" className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-800">
          {props.btn}
        </a>
      </div>
    </div>
  );
}

export default TopAlinsCard;
