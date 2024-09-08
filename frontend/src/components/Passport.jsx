import React from 'react';
import PersonalInformation from './Forms/Passport/PersonalInformation'; // Include PersonalInformation form
import EvidenceOfCitizenship from './Forms/Passport/EvidenceOfCitizenship'; // Include EvidenceOfCitizenship form

const PassportForm = ({ formData, handleChange, handleSubmit, formErrors }) => (
  <div className="h-[80vh] overflow-y-auto p-4 bg-white shadow-md rounded-lg">
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Passport Application</h1>
    <p className="text-gray-600 mb-2 text-sm">
      Fill out the form below to apply for your passport. Ensure all the information is accurate.
    </p>

    {formErrors && <p className="text-red-600 mb-2 text-sm">{formErrors}</p>}

    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Personal Information Section */}
      <PersonalInformation 
        formData={formData} 
        handleChange={handleChange} 
      />

      {/* Evidence of Citizenship Section */}
      <EvidenceOfCitizenship
        formData={formData}
        handleChange={handleChange}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm"
      >
        Submit Application
      </button>
    </form>
  </div>
);

export default PassportForm;
