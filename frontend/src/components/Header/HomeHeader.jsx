// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header 
      className="w-full py-2 px-4 flex items-center justify-between shadow-xl"
      style={{ 
        backgroundColor: '#4c2e73', // Solid background color
        color: '#FFFFFF', // White text color for contrast
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <div className="flex items-center">
        {/* Icon placeholder */}
        <img 
          src="\assets\passportplus_logo.svg" 
          alt="Icon" 
          style={{ 
            width: '50px', // Reduced size
            height: '50px', 
            marginRight: '10px' // Adjusted space between icon and text
          }} 
        />
        <h1 className="text-xl font-bold pt-5 pb-5">
          PASSPORTPLUS
        </h1>
      </div>
    </header>
  );
};

export default Header;
