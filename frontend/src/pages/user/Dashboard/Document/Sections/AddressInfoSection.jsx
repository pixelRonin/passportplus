import React from 'react';

const AddressInfoSection = ({ formData, handleChange, sectionVisibility, toggleSection }) => (
  <div className="border rounded-lg mb-2">
    <button
      type="button"
      className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
      onClick={() => toggleSection('addressInfo')}
    >
      <span className="font-semibold">Address Information</span>
      <span>{sectionVisibility.addressInfo ? '-' : '+'}</span>
    </button>
    {sectionVisibility.addressInfo && (
      <div className="p-2 grid grid-cols-1 gap-2 text-sm">
        {/* Residential Address Field */}
        <div>
          <label className="block text-gray-700">Residential Address</label>
          <textarea
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            placeholder="PO Box, Suburb, City"
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>
      </div>
    )}
  </div>
);

export default AddressInfoSection;
