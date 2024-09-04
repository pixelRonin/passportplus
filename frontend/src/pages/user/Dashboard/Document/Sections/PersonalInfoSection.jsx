// src/components/PersonalInfoSection.jsx
import React, { useState } from 'react';

const PersonalInfoSection = ({ formData, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-lg mb-2">
      <button
        type="button"
        className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
        onClick={toggleSection}
      >
        <span className="font-semibold">Personal Information</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-2 grid grid-cols-2 gap-2 text-sm">
          {/* Height Field */}
          <div>
            <label className="block text-gray-700">Height</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg text-xs"
            />
          </div>

          {/* Hair Color Field */}
          <div>
            <label className="block text-gray-700">Hair Color</label>
            <input
              type="text"
              name="hairColor"
              value={formData.hairColor}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg text-xs"
            />
          </div>

          {/* Eye Color Field */}
          <div>
            <label className="block text-gray-700">Eye Color</label>
            <input
              type="text"
              name="eyeColor"
              value={formData.eyeColor}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg text-xs"
            />
          </div>

          {/* Visual Distinguishing Marks Field */}
          <div>
            <label className="block text-gray-700">Visual Distinguishing Marks (if any)</label>
            <input
              type="text"
              name="distinguishingMarks"
              value={formData.distinguishingMarks}
              onChange={handleChange}
              className="w-full p-1 border rounded-lg text-xs"
            />
          </div>

          {/* Name Change Question */}
          <div className="col-span-2">
            <label className="block text-gray-700">Has the Applicant ever changed his/her name?</label>
            <div className="flex items-center mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="nameChanged"
                  value="yes"
                  checked={formData.nameChanged === 'yes'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center ml-4">
                <input
                  type="radio"
                  name="nameChanged"
                  value="no"
                  checked={formData.nameChanged === 'no'}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Conditional Input: Previous Names */}
          {formData.nameChanged === 'yes' && (
            <div className="col-span-2">
              <label className="block text-gray-700">If Yes, state previous names here:</label>
              <input
                type="text"
                name="previousNames"
                value={formData.previousNames}
                onChange={handleChange}
                className="w-full p-1 border rounded-lg text-xs"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;
