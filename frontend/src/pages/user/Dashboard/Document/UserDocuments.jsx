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
      mother: {
        name: '',
        dateOfBirth: '',
        placeOfBirthCitizenship: '',
      },
      father: {
        name: '',
        dateOfBirth: '',
        placeOfBirthCitizenship: '',
      },
      mothersParents: {
        name: '',
        placeOfBirth: '',
      },
      fathersParents: {
        name: '',
        placeOfBirth: '',
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

  // Section visibility states
  const [sectionsVisible, setSectionsVisible] = useState({
    personalInfo: false,
    ageConsent: false,
    departureDetails: false,
    citizenship: false,
    declaration: false,
  });

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
            nestedData[key] = value;
          } else {
            nestedData[key] = { ...nestedData[key] };
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
      // Reset form
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
          mother: {
            name: '',
            dateOfBirth: '',
            placeOfBirthCitizenship: '',
          },
          father: {
            name: '',
            dateOfBirth: '',
            placeOfBirthCitizenship: '',
          },
          mothersParents: {
            name: '',
            placeOfBirth: '',
          },
          fathersParents: {
            name: '',
            placeOfBirth: '',
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

  // Toggle section visibility
  const toggleSection = (section) => {
    setSectionsVisible((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-6">
         <div className="border-t border-gray-300 pt-4">
  <button
    type="button"
    onClick={() => toggleSection('personalInfo')}
    className="w-full text-left font-semibold text-gray-700"
  >
    Travel Document & Personal Information
  </button>
  {sectionsVisible.personalInfo && (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">Travel Document Type:</label>
          <select
            name="travelDocumentType"
            value={formData.travelDocumentType}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="Standard Passport">Standard Passport</option>
            <option value="Official Passport">Official Passport</option>
            <option value="Certificate of Identity">Certificate of Identity</option>
            <option value="Diplomatic Passport">Diplomatic Passport</option>
            <option value="Emergency Travel Document">Emergency Travel Document</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hair Color:</label>
          <select
            name="hairColor"
            value={formData.hairColor}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="Black">Black</option>
            <option value="Brown">Brown</option>
            <option value="Blonde">Blonde</option>
            <option value="Red">Red</option>
            <option value="Gray">Gray</option>
            <option value="White">White</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Eye Color:</label>
          <select
            name="eyeColor"
            value={formData.eyeColor}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="Brown">Brown</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Hazel">Hazel</option>
            <option value="Gray">Gray</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Occupation:</label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="Engineer">Engineer</option>
            <option value="Doctor">Doctor</option>
            <option value="Teacher">Teacher</option>
            <option value="Artist">Artist</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Marital Status:</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
          </select>
        </div>
        <div className="mb-4">
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
    </div>
  )}
</div>


          {/* Age Consent */}
<div className="border-t border-gray-300 pt-4">
  <button
    type="button"
    onClick={() => toggleSection('ageConsent')}
    className="w-full text-left font-semibold text-gray-700"
  >
    Age Consent
  </button>
  {sectionsVisible.ageConsent && (
    <div className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700">Are you under 17?</label>
        <select
          name="ageConsent.isUnder17"
          value={formData.ageConsent.isUnder17 ? 'Yes' : 'No'}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {formData.ageConsent.isUnder17 && (
        <div className="mb-4">
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
  )}
</div>

          {/* Departure Details */}
<div className="border-t border-gray-300 pt-4">
  <button
    type="button"
    onClick={() => toggleSection('departureDetails')}
    className="w-full text-left font-semibold text-gray-700"
  >
    Departure Details
  </button>
  {sectionsVisible.departureDetails && (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">Vessel/Airline:</label>
          <input
            type="text"
            name="departureDetails.vesselOrAirline"
            value={formData.departureDetails.vesselOrAirline}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Port/Airport:</label>
          <input
            type="text"
            name="departureDetails.portOrAirport"
            value={formData.departureDetails.portOrAirport}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Countries to Visit:</label>
          <input
            type="text"
            name="departureDetails.countriesToVisit"
            value={formData.departureDetails.countriesToVisit}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
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
  )}
</div>


          {/* Evidence of Citizenship */}
          <div className="border-t border-gray-300 pt-4">
            <button
              type="button"
              onClick={() => toggleSection('citizenship')}
              className="w-full text-left font-semibold text-gray-700"
            >
              Evidence of Citizenship
            </button>
            {sectionsVisible.citizenship && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mother's Information */}
                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-2">Mother's Information</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mother's Name:</label>
                      <input
                        type="text"
                        name="evidenceOfCitizenship.mother.name"
                        value={formData.evidenceOfCitizenship.mother.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mother's Date of Birth:</label>
                      <input
                        type="date"
                        name="evidenceOfCitizenship.mother.dateOfBirth"
                        value={formData.evidenceOfCitizenship.mother.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mother's Place of Birth/Citizenship:</label>
                      <input
                        type="text"
                        name="evidenceOfCitizenship.mother.placeOfBirthCitizenship"
                        value={formData.evidenceOfCitizenship.mother.placeOfBirthCitizenship}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                  </div>

                  {/* Father's Information */}
                  <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-2">Father's Information</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700">Father's Name:</label>
                      <input
                        type="text"
                        name="evidenceOfCitizenship.father.name"
                        value={formData.evidenceOfCitizenship.father.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Father's Date of Birth:</label>
                      <input
                        type="date"
                        name="evidenceOfCitizenship.father.dateOfBirth"
                        value={formData.evidenceOfCitizenship.father.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Father's Place of Birth/Citizenship:</label>
                      <input
                        type="text"
                        name="evidenceOfCitizenship.father.placeOfBirthCitizenship"
                        value={formData.evidenceOfCitizenship.father.placeOfBirthCitizenship}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                  </div>

                  {/* Citizenship Questions */}
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">Citizenship Questions</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700">Have you lived all your life in Papua New Guinea?</label>
                      <select
                        name="evidenceOfCitizenship.citizenshipQuestions.livedInPNG"
                        value={formData.evidenceOfCitizenship.citizenshipQuestions.livedInPNG}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Are you a citizen of Papua New Guinea?</label>
                      <select
                        name="evidenceOfCitizenship.citizenshipQuestions.citizenOfPNG"
                        value={formData.evidenceOfCitizenship.citizenshipQuestions.citizenOfPNG}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Are you a citizen of any other foreign country?</label>
                      <select
                        name="evidenceOfCitizenship.citizenshipQuestions.citizenOfForeignCountry"
                        value={formData.evidenceOfCitizenship.citizenshipQuestions.citizenOfForeignCountry}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Declaration */}
          <div className="border-t border-gray-300 pt-4">
            <button
              type="button"
              onClick={() => toggleSection('declaration')}
              className="w-full text-left font-semibold text-gray-700"
            >
              Declaration
            </button>
            {sectionsVisible.declaration && (
              <div className="mt-4">
                <div className="mb-4">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="inline text-gray-700">
                    I declare that the information provided is true and correct to the best of my knowledge.
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
              Submit Application
            </button>
          </div>

          {/* Form Errors */}
          {formErrors && (
            <div className="mt-4 text-red-600">
              <p>{formErrors}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UserDocuments;
