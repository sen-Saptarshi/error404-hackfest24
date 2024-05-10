import React, { useState } from 'react';

function Input() {
  // State to hold the input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-md mx-autoflex flex-col items-center justify-center">
      {/* Input field */}
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        className="mt-1 p-2 h-64 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Type something here..."
      />

      {/* Output adjacent to input */}
      <div>
      <h2>Output:</h2>
      <div className="mt-2 p-2 h-64 w-full border border-gray-300 rounded-md">
        <p>{inputValue}</p>
        {/* You can replace {inputValue} with any processing or output you desire */}
      </div>
      </div>
    </div>
  );
}

export default Input;
