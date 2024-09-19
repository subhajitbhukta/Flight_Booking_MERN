import React, { useState } from "react";

function Cards(props) {
const [message,setmessage]=useState('');
const handlechange=() =>{
    setmessage("Please Enter your city above");
    setTimeout(() => {
        setmessage('');
    }, 2000);
};
    return (
        <div className="flex flex-col items-center p-2 bg-white rounded-sm  max-w-sm mx-auto">
            <a href={props.link} className="block w-full mb-4">
                <img src={props.imgSrc} alt={props.heading1} className="w-72 h-56 rounded-t-lg" />
            </a>
            {message && <p className="text-green-500 font-bold mb-2">{message}</p>} 
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{props.heading1}</h2>
            <h2 className="text-lg font-medium text-gray-600">{props.heading2}</h2>
            <button onClick={handlechange} className="mt-4 px-4 py-2  border border-blue-500 text-black rounded-lg hover:bg-blue-900 hover:text-white">
                {props.btn}
            </button>
        </div>
    );
}

export default Cards;
