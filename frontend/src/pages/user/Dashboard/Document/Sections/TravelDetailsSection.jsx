// src/components/TravelDetailsSection.jsx

import React from 'react';

const TravelDetailsSection = ({ formData, handleChange, sectionVisibility, toggleSection }) => (
  <div className="border rounded-lg mb-2">
    <button
      type="button"
      className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
      onClick={() => toggleSection('travelDetails')}
    >
      <span className="font-semibold">Travel Details</span>
      <span>{sectionVisibility.travelDetails ? '-' : '+'}</span>
    </button>
    {sectionVisibility.travelDetails && (
      <div className="p-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <label className="block text-gray-700">Vessel or Airline</label>
          <input
            type="text"
            name="departureDetails.vesselOrAirline"
            value={formData.departureDetails.vesselOrAirline}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>
        <div>
          <label className="block text-gray-700">Port or Airport</label>
          <input
            type="text"
            name="departureDetails.portOrAirport"
            value={formData.departureDetails.portOrAirport}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>
        <div>
          <label className="block text-gray-700">Countries to Visit</label>
          <input
            type="text"
            name="departureDetails.countriesToVisit"
            value={formData.departureDetails.countriesToVisit}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>
        <div>
          <label className="block text-gray-700">Departure Date</label>
          <input
            type="date"
            name="departureDetails.departureDate"
            value={formData.departureDetails.departureDate}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>
      </div>
    )}
  </div>
);

export default TravelDetailsSection;
