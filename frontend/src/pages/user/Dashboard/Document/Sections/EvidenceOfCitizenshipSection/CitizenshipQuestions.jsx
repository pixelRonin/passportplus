import React from 'react';

const CitizenshipQuestions = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-gray-700">Have you lived all your life in Papua New Guinea?</label>
      <div className="flex items-center mt-1">
        <label className="flex items-center">
          <input
            type="radio"
            name="livedInPNG"
            value="yes"
            checked={formData.livedInPNG === 'yes'}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="flex items-center ml-4">
          <input
            type="radio"
            name="livedInPNG"
            value="no"
            checked={formData.livedInPNG === 'no'}
            onChange={handleChange}
            className="mr-2"
          />
          No
        </label>
      </div>
      {formData.livedInPNG === 'no' && (
        <div className="mt-2">
          <label className="block text-gray-700">If No, where?</label>
          <input
            type="text"
            name="previousResidences"
            value={formData.previousResidences}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          />
        </div>
      )}
    </div>

    <div>
      <label className="block text-gray-700">Are you a citizen of Papua New Guinea?</label>
      <div className="flex items-center mt-1">
        <label className="flex items-center">
          <input
            type="radio"
            name="citizenOfPNG"
            value="yes"
            checked={formData.citizenOfPNG === 'yes'}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="flex items-center ml-4">
          <input
            type="radio"
            name="citizenOfPNG"
            value="no"
            checked={formData.citizenOfPNG === 'no'}
            onChange={handleChange}
            className="mr-2"
          />
          No
        </label>
      </div>
    </div>

    <div>
      <label className="block text-gray-700">Are you a citizen of a foreign country?</label>
      <div className="flex items-center mt-1">
        <label className="flex items-center">
          <input
            type="radio"
            name="citizenOfForeignCountry"
            value="yes"
            checked={formData.citizenOfForeignCountry === 'yes'}
            onChange={handleChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="flex items-center ml-4">
          <input
            type="radio"
            name="citizenOfForeignCountry"
            value="no"
            checked={formData.citizenOfForeignCountry === 'no'}
            onChange={handleChange}
            className="mr-2"
          />
          No
        </label>
      </div>
    </div>
  </div>
);

export default CitizenshipQuestions;
