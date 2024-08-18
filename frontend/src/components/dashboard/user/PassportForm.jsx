// PassportForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PassportForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/passport-application', data);
      console.log('Success:', response.data);
      alert('Passport application submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit passport application.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Passport Application Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label htmlFor="travelDocumentType" className="block text-sm font-medium text-gray-700">Travel Document Type</label>
          <input
            id="travelDocumentType"
            type="text"
            {...register('travelDocumentType', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.travelDocumentType ? 'border-red-500' : ''}`}
          />
          {errors.travelDocumentType && <p className="text-red-500 text-sm mt-1">Travel Document Type is required</p>}
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
          <input
            id="height"
            type="text"
            {...register('height', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.height ? 'border-red-500' : ''}`}
          />
          {errors.height && <p className="text-red-500 text-sm mt-1">Height is required</p>}
        </div>

        <div>
          <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">Hair Color</label>
          <input
            id="hairColor"
            type="text"
            {...register('hairColor', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.hairColor ? 'border-red-500' : ''}`}
          />
          {errors.hairColor && <p className="text-red-500 text-sm mt-1">Hair Color is required</p>}
        </div>

        <div>
          <label htmlFor="eyeColor" className="block text-sm font-medium text-gray-700">Eye Color</label>
          <input
            id="eyeColor"
            type="text"
            {...register('eyeColor', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.eyeColor ? 'border-red-500' : ''}`}
          />
          {errors.eyeColor && <p className="text-red-500 text-sm mt-1">Eye Color is required</p>}
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Occupation</label>
          <input
            id="occupation"
            type="text"
            {...register('occupation', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.occupation ? 'border-red-500' : ''}`}
          />
          {errors.occupation && <p className="text-red-500 text-sm mt-1">Occupation is required</p>}
        </div>

        <div>
          <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
          <input
            id="maritalStatus"
            type="text"
            {...register('maritalStatus', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.maritalStatus ? 'border-red-500' : ''}`}
          />
          {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">Marital Status is required</p>}
        </div>

        <div>
          <label htmlFor="residentialAddress" className="block text-sm font-medium text-gray-700">Residential Address</label>
          <input
            id="residentialAddress"
            type="text"
            {...register('residentialAddress', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.residentialAddress ? 'border-red-500' : ''}`}
          />
          {errors.residentialAddress && <p className="text-red-500 text-sm mt-1">Residential Address is required</p>}
        </div>

        <div>
          <label htmlFor="correspondenceAddress" className="block text-sm font-medium text-gray-700">Correspondence Address</label>
          <input
            id="correspondenceAddress"
            type="text"
            {...register('correspondenceAddress', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.correspondenceAddress ? 'border-red-500' : ''}`}
          />
          {errors.correspondenceAddress && <p className="text-red-500 text-sm mt-1">Correspondence Address is required</p>}
        </div>

        <div>
          <label htmlFor="departureDetails" className="block text-sm font-medium text-gray-700">Departure Details</label>
          <input
            id="departureDetails"
            type="text"
            {...register('departureDetails')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="previousTravelDocument" className="block text-sm font-medium text-gray-700">Previous Travel Document</label>
          <input
            id="previousTravelDocument"
            type="text"
            {...register('previousTravelDocument')}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="declaration" className="block text-sm font-medium text-gray-700">Declaration</label>
          <textarea
            id="declaration"
            {...register('declaration', { required: true })}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.declaration ? 'border-red-500' : ''}`}
          />
          {errors.declaration && <p className="text-red-500 text-sm mt-1">Declaration is required</p>}
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
      </form>
    </div>
  );
};

export default PassportForm;
