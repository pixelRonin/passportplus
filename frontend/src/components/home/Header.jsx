// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header 
      className="w-1/2 py-4 px-6 flex items-center justify-between"
      style={{ 
        backgroundColor: '#5a15cb', // Solid background color
        color: '#00BF57', // White text color for contrast
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <div className="flex items-center">
        {/* Icon placeholder */}
        <img 
          src="" 
          alt="Icon" 
          style={{ 
            width: '50px', // Reduced size
            height: '50px', 
            marginRight: '10px' // Adjusted space between icon and text
          }} 
        />
        <h1 className="text-2xl font-bold">
          PASSPORTPLUS
        </h1>
      </div>
    </header>
  );
};

export default Header;
