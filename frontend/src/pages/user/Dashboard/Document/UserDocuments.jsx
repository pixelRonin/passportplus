import React, { useState } from 'react';
import passportService from '../../../../services/passportService'; // Importing the default export
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure Toastify CSS is imported

const UserDocuments = () => {
  const [formData, setFormData] = useState({
    travelDocumentType: '',
    height: '',
    hairColor: '',
    eyeColor: '',
    occupation: '',
    maritalStatus: '',
    residentialAddress: '',
    ageConsent: {
      isUnder17: false,
      consentDetails: '',
    },
    departureDetails: {
      vesselOrAirline: '',
      portOrAirport: '',
      countriesToVisit: '',
      departureDate: '',
    },
    evidenceOfCitizenship: {
      parentInfo: {
        motherNameDOB: '',
        motherPlaceOfBirthCitizenship: '',
        fatherNameDOB: '',
        fatherPlaceOfBirthCitizenship: '',
        mothersParents: '',
        mothersParentsPlaceOfBirth: '',
        fathersParents: '',
        fathersParentsPlaceOfBirth: '',
      },
      citizenshipQuestions: {
        livedInPNG: '',
        citizenOfPNG: '',
        citizenOfForeignCountry: '',
      },
    },
    declaration: false,
  });

  const [formErrors, setFormErrors] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' || type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    } else if (name.includes('.')) {
      const keys = name.split('.');
      setFormData((prevData) => {
        let updatedData = { ...prevData };

        keys.reduce((nestedData, key, index) => {
          if (index === keys.length - 1) {
            nestedData[key] = value; // Set the final value
          } else {
            nestedData[key] = { ...nestedData[key] }; // Continue navigating through the nested fields
          }
          return nestedData[key];
        }, updatedData);

        return updatedData;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await passportService.createPassportApplication(formData);
      toast.success('Your passport application has been successfully submitted!');
      setFormErrors('');
      setFormVisible(false);
      setFormData({
        travelDocumentType: '',
        height: '',
        hairColor: '',
        eyeColor: '',
        occupation: '',
        maritalStatus: '',
        residentialAddress: '',
        ageConsent: {
          isUnder17: false,
          consentDetails: '',
        },
        departureDetails: {
          vesselOrAirline: '',
          portOrAirport: '',
          countriesToVisit: '',
          departureDate: '',
        },
        evidenceOfCitizenship: {
          parentInfo: {
            motherNameDOB: '',
            motherPlaceOfBirthCitizenship: '',
            fatherNameDOB: '',
            fatherPlaceOfBirthCitizenship: '',
            mothersParents: '',
            mothersParentsPlaceOfBirth: '',
            fathersParents: '',
            fathersParentsPlaceOfBirth: '',
          },
          citizenshipQuestions: {
            livedInPNG: '',
            citizenOfPNG: '',
            citizenOfForeignCountry: '',
          },
        },
        declaration: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormErrors(error.response?.data?.message || 'An error occurred while submitting the form');
      toast.error('An error occurred while submitting the form');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Core Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-gray-700">Travel Document Type:</label>
              <select
                name="travelDocumentType"
                value={formData.travelDocumentType}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select a document type</option>
                <option value="Standard Passport">Standard Passport</option>
                <option value="Official Passport">Official Passport</option>
                <option value="Certificate of Identity">Certificate of Identity</option>
                <option value="Diplomatic Passport">Diplomatic Passport</option>
                <option value="Emergency Travel Document">Emergency Travel Document</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Height:</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Hair Color:</label>
              <input
                type="text"
                name="hairColor"
                value={formData.hairColor}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Eye Color:</label>
              <input
                type="text"
                name="eyeColor"
                value={formData.eyeColor}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Occupation:</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Marital Status:</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select your marital status</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Residential Address:</label>
              <input
                type="text"
                name="residentialAddress"
                value={formData.residentialAddress}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>

          {/* Age Consent */}
          <div>
  <h3 className="text-lg font-semibold">Age Consent</h3>
  <div>
    <label className="block text-gray-700">Is the applicant under 17 years old?</label>
    <select
      name="ageConsent.isUnder17"
      value={formData.ageConsent.isUnder17 ? 'yes' : 'no'}
      onChange={(e) =>
        handleChange({
          target: { name: e.target.name, value: e.target.value === 'yes' },
        })
      }
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    >
      <option value="no">No</option>
      <option value="yes">Yes</option>
    </select>
  </div>
  {formData.ageConsent.isUnder17 && (
    <div className="mt-2">
      <label className="block text-gray-700">Consent Details:</label>
      <input
        type="text"
        name="ageConsent.consentDetails"
        value={formData.ageConsent.consentDetails}
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  )}
</div>

          {/* Departure Details */}
          <div>
            <h3 className="text-lg font-semibold">Departure Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Vessel or Airline:</label>
                <input
                  type="text"
                  name="departureDetails.vesselOrAirline"
                  value={formData.departureDetails.vesselOrAirline}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Port or Airport:</label>
                <input
                  type="text"
                  name="departureDetails.portOrAirport"
                  value={formData.departureDetails.portOrAirport}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Countries to Visit:</label>
                <input
                  type="text"
                  name="departureDetails.countriesToVisit"
                  value={formData.departureDetails.countriesToVisit}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Departure Date:</label>
                <input
                  type="date"
                  name="departureDetails.departureDate"
                  value={formData.departureDetails.departureDate}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          </div>

          {/* Evidence of Citizenship */}
          <div>
            <h3 className="text-lg font-semibold">Evidence of Citizenship</h3>
            {/* Parent Information */}
            <div>
              <h4 className="text-md font-semibold">Parent Information</h4>
              {[
                { label: 'Mother Name and DOB', name: 'motherNameDOB' },
                { label: 'Mother Place of Birth and Citizenship', name: 'motherPlaceOfBirthCitizenship' },
                { label: 'Father Name and DOB', name: 'fatherNameDOB' },
                { label: 'Father Place of Birth and Citizenship', name: 'fatherPlaceOfBirthCitizenship' },
                { label: 'Mother\'s Parents', name: 'mothersParents' },
                { label: 'Mother\'s Parents Place of Birth', name: 'mothersParentsPlaceOfBirth' },
                { label: 'Father\'s Parents', name: 'fathersParents' },
                { label: 'Father\'s Parents Place of Birth', name: 'fathersParentsPlaceOfBirth' },
              ].map(({ label, name }) => (
                <div key={name} className="mb-2">
                  <label className="block text-gray-700">{label}:</label>
                  <input
                    type="text"
                    name={`evidenceOfCitizenship.parentInfo.${name}`}
                    value={formData.evidenceOfCitizenship.parentInfo[name]}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              ))}
            </div>

            {/* Citizenship Questions */}
            <div>
              <h4 className="text-md font-semibold">Citizenship Questions</h4>
              {[
                { label: 'Lived in PNG', name: 'livedInPNG' },
                { label: 'Citizen of PNG', name: 'citizenOfPNG' },
                { label: 'Citizen of Foreign Country', name: 'citizenOfForeignCountry' },
              ].map(({ label, name }) => (
                <div key={name} className="mb-2">
                  <label className="block text-gray-700">{label}:</label>
                  <select
                    name={`evidenceOfCitizenship.citizenshipQuestions.${name}`}
                    value={formData.evidenceOfCitizenship.citizenshipQuestions[name]}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Declaration */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">I declare that the information provided is accurate.</span>
            </label>
          </div>

          <div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
          </div>
          {formErrors && <p className="text-red-500">{formErrors}</p>}
        </form>
      )}
    </div>
  );
};

export default UserDocuments;
