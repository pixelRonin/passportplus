import React, { useState } from 'react';
import { createPassportApplication } from '../../../../services/UserService';
import PassportForm from './PassportForm'; // Adjust the path as necessary
import { toast } from 'react-toastify';

const UserDocuments = () => {
  const [formData, setFormData] = useState({
    travelDocumentType: '',
    height: '',
    hairColor: '',
    eyeColor: '',
    occupation: '',
    maritalStatus: '',
    residentialAddress: '',
    correspondenceAddress: '',
    departureDetails: {
      vesselOrAirline: '',
      portOrAirport: '',
      countriesToVisit: '',
      departureDate: '',
    },
    previousTravelDocument: {
      issuedBefore: false,
      travelDocumentNumber: '',
    },
    declaration: false,
  });

  const [formErrors, setFormErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [sectionVisibility, setSectionVisibility] = useState({
    personalInfo: true,
    occupationMaritalStatus: true,
    addressInfo: true,
    travelDetails: true,
    declaration: true,
  });

  const [formVisible, setFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: type === 'date' ? value : value, // Handling date type if necessary
        },
      }));
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
      await createPassportApplication(formData);
      toast.success('Your passport application has been successfully submitted!');
      setFormErrors('');
      setFormVisible(false); // Hide the form after successful submission
      setFormData({
        travelDocumentType: '',
        height: '',
        hairColor: '',
        eyeColor: '',
        occupation: '',
        maritalStatus: '',
        residentialAddress: '',
        correspondenceAddress: '',
        departureDetails: {
          vesselOrAirline: '',
          portOrAirport: '',
          countriesToVisit: '',
          departureDate: '',
        },
        previousTravelDocument: {
          issuedBefore: false,
          travelDocumentNumber: '',
        },
        declaration: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormErrors(error.response?.data?.message || 'An error occurred while submitting the form');
      toast.error('An error occurred while submitting the form');
    }
  };

  const toggleSection = (section) => {
    setSectionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [section]: !prevVisibility[section],
    }));
  };

  return (
    <div>
      {formVisible && (
        <PassportForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          sectionVisibility={sectionVisibility}
          toggleSection={toggleSection}
          formErrors={formErrors}
        />
      )}
    </div>
  );
};

export default UserDocuments;