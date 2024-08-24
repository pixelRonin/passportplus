// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header 
      className="w-full py-4 px-6 flex items-center justify-between shadow-2xl"
      style={{ 
        backgroundColor: '#724ba5', // Solid background color
        color: '#00BF57', // White text color for contrast
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <div className="flex items-center">
        {/* Icon placeholder */}
        <img 
          src="\assets\passportplus_logo.svg" 
          alt="Icon" 
          style={{ 
            width: '60px', // Reduced size
            height: '60px', 
            marginRight: '10px' // Adjusted space between icon and text
          }} 
        />
        <h1 className="text-2xl font-bold text-[#00BF57]">
          PASSPORTPLUS
        </h1>
      </div>
    </header>
  );
};

export default Header;
