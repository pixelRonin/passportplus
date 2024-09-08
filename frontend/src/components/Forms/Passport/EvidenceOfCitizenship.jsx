import React from 'react';
import { useForm } from 'react-hook-form';

const EvidenceOfCitizenshipForm = ({ onChange }) => {
  const { register, watch, formState: { errors } } = useForm();

  // Watch form data and pass it to the parent or use it internally
  const formData = watch();

  // Use the onChange callback to pass form data to the parent component
  React.useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Evidence of Citizenship</h2>

      {/* Father's Information Section */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Father’s Information</legend>
        <label className="block mb-2">
          Full Name:
          <input 
            {...register('fatherName', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.fatherName && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Date of Birth:
          <input 
            type="date" 
            {...register('fatherDOB', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.fatherDOB && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Place of Birth:
          <input 
            {...register('fatherPOB', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.fatherPOB && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Nationality:
          <input 
            {...register('fatherNationality', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.fatherNationality && <span className="text-red-600">This field is required</span>}
        </label>
      </fieldset>

      {/* Mother's Information Section */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Mother’s Information</legend>
        <label className="block mb-2">
          Full Name:
          <input 
            {...register('motherName', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.motherName && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Date of Birth:
          <input 
            type="date" 
            {...register('motherDOB', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.motherDOB && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Place of Birth:
          <input 
            {...register('motherPOB', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.motherPOB && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Nationality:
          <input 
            {...register('motherNationality', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
          />
          {errors.motherNationality && <span className="text-red-600">This field is required</span>}
        </label>
      </fieldset>

      {/* Residency Information Section */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Residency Information</legend>
        <label className="block mb-2">
          Have you lived all your life in Papua New Guinea?
          <select 
            {...register('livedInPNG', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.livedInPNG && <span className="text-red-600">This field is required</span>}
        </label>
        {watch('livedInPNG') === 'No' && (
          <label className="block mb-2">
            If No, where?
            <input 
              {...register('otherLocation')} 
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
            />
          </label>
        )}
      </fieldset>

      {/* Citizenship Information Section */}
      <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
        <legend className="text-lg font-semibold mb-2">Citizenship Information</legend>
        <label className="block mb-2">
          Are you a citizen of Papua New Guinea?
          <select 
            {...register('citizenPNG', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.citizenPNG && <span className="text-red-600">This field is required</span>}
        </label>
        <label className="block mb-2">
          Do you hold citizenship in a country other than the one where you currently live?
          <select 
            {...register('otherCitizenship', { required: true })} 
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an option</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {errors.otherCitizenship && <span className="text-red-600">This field is required</span>}
        </label>
        {watch('otherCitizenship') === 'Yes' && (
          <label className="block mb-2">
            If Yes, which country?
            <input 
              {...register('otherCountry')} 
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md" 
            />
          </label>
        )}
      </fieldset>
    </div>
  );
};

export default EvidenceOfCitizenshipForm;
