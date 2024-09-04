import React from 'react';

const OccupationMaritalStatusSection = ({ formData, handleChange, sectionVisibility, toggleSection }) => (
  <div className="border rounded-lg mb-2">
    <button
      type="button"
      className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
      onClick={() => toggleSection('occupationMaritalStatus')}
    >
      <span className="font-semibold">Occupation and Marital Status</span>
      <span>{sectionVisibility.occupationMaritalStatus ? '-' : '+'}</span>
    </button>
    {sectionVisibility.occupationMaritalStatus && (
      <div className="p-2 grid grid-cols-2 gap-2 text-sm">
        {/* Occupation Field */}
        <div>
          <label className="block text-gray-700">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>

        {/* Marital Status Field */}
        <div>
          <label className="block text-gray-700">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        {/* Conditional Input: Name of Husband/Wife */}
        {formData.maritalStatus === 'Married' && (
          <div className="col-span-2">
            <label className="block text-gray-700">If married, Name of husband/wife:</label>
            <input
              type="text"
              name="spouseName"
              value={formData.spouseName}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg text-xs"
            />
          </div>
        )}
      </div>
    )}
  </div>
);

export default OccupationMaritalStatusSection;
