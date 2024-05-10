import React, { useState } from 'react';

function Output() {
  // State to hold the input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
<<<<<<< HEAD
    <div className="max-w-md mx-auto">
      {/* Input field */}
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Type something here..."
      />

      {/* Output adjacent to input */}
    </div>
=======
    <>
      <div className="bg-gray-800 text-white flex justify-between items-center h-16 px-4">
        {/* Logo or Brand Name */}
        <h1 className="text-xl font-bold">TransLingoGPT</h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            Models
          </a>
          <a href="#" className="hover:text-gray-400">
            Devs
          </a>
        </nav>

        {/* Hamburger Menu for Mobile (Optional) */}
        <button className="md:hidden focus:outline-none">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16v12H4zm-2-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z"
            />
          </svg>
        </button>
      </div>
    </>
>>>>>>> dded54093d84657fcb9276d0e3f572e5fefa025b
  );
}

export default MyComponent;
