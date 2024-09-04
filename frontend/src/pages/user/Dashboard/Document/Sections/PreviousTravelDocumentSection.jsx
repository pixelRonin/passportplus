// src/components/PreviousTravelDocumentSection.jsx

import React from 'react';

const PreviousTravelDocumentSection = ({ formData, handleChange, sectionVisibility, toggleSection }) => (
  <div className="border rounded-lg mb-2">
    <button
      type="button"
      className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
      onClick={() => toggleSection('previousTravelDocument')}
    >
      <span className="font-semibold">Previous Travel Document</span>
      <span>{sectionVisibility.previousTravelDocument ? '-' : '+'}</span>
    </button>
    {sectionVisibility.previousTravelDocument && (
      <div className="p-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <label className="block text-gray-700">Issued Before</label>
          <input
            type="checkbox"
            name="previousTravelDocument.issuedBefore"
            checked={formData.previousTravelDocument.issuedBefore}
            onChange={handleChange}
            className="mr-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Travel Document Number</label>
          <input
            type="text"
            name="previousTravelDocument.travelDocumentNumber"
            value={formData.previousTravelDocument.travelDocumentNumber}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>
      </div>
    )}
  </div>
);

export default PreviousTravelDocumentSection;
