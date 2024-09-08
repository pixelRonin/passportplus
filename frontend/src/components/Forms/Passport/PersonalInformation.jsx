import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const PersonalInformation = ({ handleChange }) => {
  const { register, watch, setValue, formState: { errors } } = useForm();

  // Watch all form fields
  const watchFields = watch();

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('personalInformation'));
    if (savedData) {
      Object.keys(savedData).forEach(key => {
        setValue(key, savedData[key]); // Pre-fill form with saved data
      });
    }
  }, [setValue]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('personalInformation', JSON.stringify(watchFields));
  }, [watchFields]);

  const isNameChange = watch('nameChange') === 'Yes';
  const isUnder17 = watch('ageConsent.isUnder17') === true;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Personal Information Form</h2>

      {/* Type of Travel Document Section */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Type of Travel Document</legend>
        <label className="block mb-2">
          Travel Document:
          <select
            {...register('travelDocumentType', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a document type</option>
            <option value="Standard Passport">Standard Passport</option>
            <option value="Official Passport">Official Passport</option>
            <option value="Certificate of Identity">Certificate of Identity</option>
            <option value="Diplomatic Passport">Diplomatic Passport</option>
            <option value="Emergency Travel Document">Emergency Travel Document</option>
          </select>
          {errors.travelDocumentType && <span className="text-red-600">This field is required</span>}
        </label>
      </fieldset>

      {/* Applicant Information */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Applicant Information</legend>
        <label className="block mb-2">
          Have you ever changed your name?
          <select
            {...register('nameChange', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an option</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {errors.nameChange && <span className="text-red-600">This field is required</span>}
        </label>
        {isNameChange && (
          <label className="block mb-2">
            If yes, please provide your previous name(s):
            <input
              {...register('previousName', { required: isNameChange })}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.previousName && <span className="text-red-600">This field is required</span>}
          </label>
        )}
        {/* Other Fields */}
        <label className="block mb-2">
          Occupation:
          <input
            {...register('occupation', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {errors.occupation && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Residential Address:
          <input
            {...register('residentialAddress', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {errors.residentialAddress && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Height (in cm):
          <input
            type="number"
            {...register('height', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {errors.height && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Hair Color:
          <input
            type="text"
            {...register('hairColor', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {errors.hairColor && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Eye Color:
          <input
            type="text"
            {...register('eyeColor', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {errors.eyeColor && <span className="text-red-600">This field is required</span>}
        </label>
      </fieldset>

      {/* Marital Status */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Marital Status</legend>
        <label className="block mb-2">
          Marital Status:
          <select
            {...register('maritalStatus', { required: true })}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select your status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {errors.maritalStatus && <span className="text-red-600">This field is required</span>}
        </label>
      </fieldset>

      {/* Consent Information */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Consent Information</legend>
        <label className="block mb-2">
          Are you under 17 years of age?
          <input
            type="checkbox"
            {...register('ageConsent.isUnder17')}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
        {isUnder17 && (
          <label className="block mb-2">
            Consent Details (Required if under 17):
            <input
              type="text"
              {...register('ageConsent.consentDetails', { required: isUnder17 })}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
            {errors.ageConsent?.consentDetails && <span className="text-red-600">This field is required</span>}
          </label>
        )}
      </fieldset>
    </div>
  );
};

export default PersonalInformation;
