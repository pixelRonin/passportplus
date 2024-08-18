import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10 flex justify-end">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Passport Application Form</h1>
        
        {/* Progress Indicator */}
        <div className="flex justify-between mb-6">
          {['Personal Info', 'Addresses', 'Additional Info', 'Review & Submit'].map((label, index) => (
            <div key={index} className={`flex items-center ${step === index + 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <FaCheckCircle className={`w-6 h-6 ${step > index + 1 ? 'text-indigo-600' : ''}`} />
              <span className="ml-2 text-sm">{label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="travelDocumentType" className="block text-sm font-medium text-gray-700">Travel Document Type</label>
                  <input
                    id="travelDocumentType"
                    type="text"
                    {...register('travelDocumentType', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.travelDocumentType ? 'border-red-500' : ''}`}
                  />
                  {errors.travelDocumentType && <p className="text-red-500 text-sm mt-1">Travel Document Type is required</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
                  <input
                    id="height"
                    type="text"
                    {...register('height', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.height ? 'border-red-500' : ''}`}
                  />
                  {errors.height && <p className="text-red-500 text-sm mt-1">Height is required</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">Hair Color</label>
                  <input
                    id="hairColor"
                    type="text"
                    {...register('hairColor', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.hairColor ? 'border-red-500' : ''}`}
                  />
                  {errors.hairColor && <p className="text-red-500 text-sm mt-1">Hair Color is required</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="eyeColor" className="block text-sm font-medium text-gray-700">Eye Color</label>
                  <input
                    id="eyeColor"
                    type="text"
                    {...register('eyeColor', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.eyeColor ? 'border-red-500' : ''}`}
                  />
                  {errors.eyeColor && <p className="text-red-500 text-sm mt-1">Eye Color is required</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Occupation</label>
                  <input
                    id="occupation"
                    type="text"
                    {...register('occupation', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.occupation ? 'border-red-500' : ''}`}
                  />
                  {errors.occupation && <p className="text-red-500 text-sm mt-1">Occupation is required</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
                  <input
                    id="maritalStatus"
                    type="text"
                    {...register('maritalStatus', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.maritalStatus ? 'border-red-500' : ''}`}
                  />
                  {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">Marital Status is required</p>}
                </div>

                <div className="col-span-2 flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-300 text-white py-2 px-4 rounded-md hover:bg-gray-400"
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="residentialAddress" className="block text-sm font-medium text-gray-700">Residential Address</label>
                  <input
                    id="residentialAddress"
                    type="text"
                    {...register('residentialAddress', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.residentialAddress ? 'border-red-500' : ''}`}
                  />
                  {errors.residentialAddress && <p className="text-red-500 text-sm mt-1">Residential Address is required</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="correspondenceAddress" className="block text-sm font-medium text-gray-700">Correspondence Address</label>
                  <input
                    id="correspondenceAddress"
                    type="text"
                    {...register('correspondenceAddress', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.correspondenceAddress ? 'border-red-500' : ''}`}
                  />
                  {errors.correspondenceAddress && <p className="text-red-500 text-sm mt-1">Correspondence Address is required</p>}
                </div>

                <div className="col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="departureDetails" className="block text-sm font-medium text-gray-700">Departure Details</label>
                  <input
                    id="departureDetails"
                    type="text"
                    {...register('departureDetails')}
                    className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="previousTravelDocument" className="block text-sm font-medium text-gray-700">Previous Travel Document</label>
                  <input
                    id="previousTravelDocument"
                    type="text"
                    {...register('previousTravelDocument')}
                    className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>

                <div className="col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label htmlFor="declaration" className="block text-sm font-medium text-gray-700">Declaration</label>
                  <textarea
                    id="declaration"
                    {...register('declaration', { required: true })}
                    className={`mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.declaration ? 'border-red-500' : ''}`}
                  />
                  {errors.declaration && <p className="text-red-500 text-sm mt-1">Declaration is required</p>}
                </div>

                <div className="col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
