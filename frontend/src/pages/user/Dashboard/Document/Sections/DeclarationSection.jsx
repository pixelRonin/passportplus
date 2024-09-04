// src/components/DeclarationSection.jsx

import React from 'react';

const DeclarationSection = ({ formData, handleChange, sectionVisibility, toggleSection }) => (
  <div className="border rounded-lg mb-2">
    <button
      type="button"
      className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
      onClick={() => toggleSection('declaration')}
    >
      <span className="font-semibold">Declaration</span>
      <span>{sectionVisibility.declaration ? '-' : '+'}</span>
    </button>
    {sectionVisibility.declaration && (
      <div className="p-2 flex items-center text-sm">
        <input
          type="checkbox"
          name="declaration"
          checked={formData.declaration}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">I declare that all the information provided is correct</label>
      </div>
    )}
  </div>
);

export default DeclarationSection;
