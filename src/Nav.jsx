import React, { useState } from 'react';

function Output() {
  // State to hold the input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
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
  );
}

export default MyComponent;
