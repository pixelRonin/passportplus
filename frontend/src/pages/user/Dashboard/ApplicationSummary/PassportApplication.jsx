import React, { useState, useEffect } from 'react';
import userServices from '../../../../services/userService';

const PassportApplication = ({ userId }) => {
  const [applicationData, setApplicationData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [commissioners, setCommissioners] = useState([]);
  const [selectedCommissionerName, setSelectedCommissionerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingCommissioners, setLoadingCommissioners] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [error, setError] = useState(null);

  // Fetch application data
  useEffect(() => {
    const fetchApplicationData = async () => {
      setLoading(true);
      try {
        const data = await userServices.getPassportApplication(userId);
        setApplicationData(data);
        setError(null); // Reset error on success
      } catch (err) {
        setError('Error fetching application data');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [userId]);

  // Search commissioners with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchCommissioners();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const searchCommissioners = async () => {
    setLoadingCommissioners(true);
    try {
      const data = await userServices.searchCommissioners(searchQuery);
      setCommissioners(data || []);
      setError(null); // Reset error if search is successful
    } catch (err) {
      setError('Error fetching commissioners');
    } finally {
      setLoadingCommissioners(false);
    }
  };

  // Handle radio button change
  const handleRadioChange = (commissioner) => {
    setSelectedCommissionerName(`${commissioner.first_name} ${commissioner.last_name}`);
  };

  // Function to handle assigning a commissioner
  // Function to handle assigning a commissioner
  const handleAssignCommissioner = async () => {
    console.log('Attempting to assign commissioner...');
  
    // Check for required inputs before proceeding
    if (!selectedCommissionerName) {
      console.log('No commissioner selected.');
      return;
    }
    
    /*if (!userId) {
      console.log('No userId found.');
      return;
    }
  */
    if (loadingAssign) {
      console.log('Commissioner assignment already in progress.');
      return;
    }
  
    setLoadingAssign(true);
    console.log('Loading state set to true.');
  
    try {
      console.log(`Assigning commissioner "${selectedCommissionerName}" to userId: ${userId}`);
  
      // Call the service to assign commissioner using the userObjectId (userId)
      const response = await userServices.assignCommissioner(userId, selectedCommissionerName);
  
      console.log('Commissioner assigned successfully, response:', response);
      alert(response.message || 'Commissioner assigned successfully');
      setError(null); // Reset error on successful assignment
    } catch (error) {
      console.error('Error during commissioner assignment:', error);
      alert('An error occurred while assigning the commissioner.');
    } finally {
      setLoadingAssign(false);
      console.log('Loading state set to false.');
    }
  };

  // Early return if application data is still loading
  if (loading) {
    return <div className="text-center text-primary">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  if (!applicationData) {
    return <div>No application data available</div>;
  }

  const { user, passportApplication, documents, payment } = applicationData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-primary mb-4">Passport Application Details</h1>

      {/* Uploaded Documents */}
<div className="mb-6">
  <h2 className="text-lg font-semibold text-secondary mb-2">Uploaded Documents</h2>
  <div className="flex flex-wrap">
    {documents?.files?.length > 0 ? (
      documents.files.map((file, index) => (
        <div key={index} className="w-1/3 p-2">
          {file.url.endsWith('.pdf') ? (
            // Use iframe or embed for PDF files
            <iframe
              src={file.url}
              title={`Document ${index + 1}`}
              className="w-full h-64 rounded-lg border-2"
            >
              This browser does not support PDFs.
            </iframe>
          ) : (
            // Use img for image files
            <img
              src={file.url}
              alt={`Document ${index + 1}`}
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>
      ))
    ) : (
      <p>No documents uploaded</p>
    )}
  </div>
</div>

      {/* Applicant Information */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-2">Applicant Information</h2>
        <p><strong>First Name:</strong> {user?.first_name || 'N/A'}</p>
        <p><strong>Last Name:</strong> {user?.last_name || 'N/A'}</p>
        {user?.profile?.place_of_birth ? (
          <>
            <p><strong>Village:</strong> {user.profile.place_of_birth.village || 'N/A'}</p>
            <p><strong>Town:</strong> {user.profile.place_of_birth.town || 'N/A'}</p>
            <p><strong>Province:</strong> {user.profile.place_of_birth.province || 'N/A'}</p>
            <p><strong>Country:</strong> {user.profile.place_of_birth.country || 'N/A'}</p>
          </>
        ) : (
          <p>Place of birth data is unavailable</p>
        )}
      </div>

      {/* Application Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-2">Application Summary</h2>
        <p><strong>Travel Document Type:</strong> {passportApplication?.travelDocumentType || 'N/A'}</p>
        <p><strong>Height:</strong> {passportApplication?.height || 'N/A'} cm</p>
        <p><strong>Hair Color:</strong> {passportApplication?.hairColor || 'N/A'}</p>
        <p><strong>Eye Color:</strong> {passportApplication?.eyeColor || 'N/A'}</p>
        <p><strong>Occupation:</strong> {passportApplication?.occupation || 'N/A'}</p>
        <p><strong>Marital Status:</strong> {passportApplication?.maritalStatus || 'N/A'}</p>
        <p><strong>Residential Address:</strong> {passportApplication?.residentialAddress || 'N/A'}</p>
      </div>

      {/* Parental Information */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-2">Parental Information</h2>

        {passportApplication?.evidenceOfCitizenship?.mother && (
          <div className="mb-4">
            <h3 className="text-md font-semibold text-primary">Mother's Details</h3>
            <p><strong>Name:</strong> {passportApplication.evidenceOfCitizenship.mother.name || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {passportApplication.evidenceOfCitizenship.mother.dateOfBirth ? new Date(passportApplication.evidenceOfCitizenship.mother.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Place of Birth/Citizenship:</strong> {passportApplication.evidenceOfCitizenship.mother.placeOfBirthCitizenship || 'N/A'}</p>
          </div>
        )}

        {passportApplication?.evidenceOfCitizenship?.father && (
          <div className="mb-4">
            <h3 className="text-md font-semibold text-primary">Father's Details</h3>
            <p><strong>Name:</strong> {passportApplication.evidenceOfCitizenship.father.name || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {passportApplication.evidenceOfCitizenship.father.dateOfBirth ? new Date(passportApplication.evidenceOfCitizenship.father.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Place of Birth/Citizenship:</strong> {passportApplication.evidenceOfCitizenship.father.placeOfBirthCitizenship || 'N/A'}</p>
          </div>
        )}

        {passportApplication?.evidenceOfCitizenship?.citizenshipQuestions && (
          <div>
            <h3 className="text-md font-semibold text-primary">Citizenship Questions</h3>
            <p><strong>Lived in PNG:</strong> {passportApplication.evidenceOfCitizenship.citizenshipQuestions.livedInPNG || 'N/A'}</p>
            <p><strong>Citizen of PNG:</strong> {passportApplication.evidenceOfCitizenship.citizenshipQuestions.citizenOfPNG || 'N/A'}</p>
            <p><strong>Citizen of Foreign Country:</strong> {passportApplication.evidenceOfCitizenship.citizenshipQuestions.citizenOfForeignCountry || 'N/A'}</p>
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-2">Payment Information</h2>
        <p><strong>Amount Paid:</strong> {payment?.amount ? `${payment.amount} ${payment.currency}` : 'N/A'}</p>
        <p><strong>Date of Payment:</strong> {payment?.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}</p>
      </div>

      {/* Commissioner Search and Assignment */}
<div className="bg-gray-100 p-6 rounded-lg mb-6">
  <h2 className="text-lg font-semibold text-secondary mb-4">Assign a Commissioner</h2>
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search commissioners"
    className="border border-gray-300 px-4 py-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-150"
  />

  {loadingCommissioners ? (
    <p className="text-gray-600">Loading commissioners...</p>
  ) : (
    <ul className="list-none p-0">
      {commissioners.length > 0 ? (
        commissioners.map((commissioner) => (
          <li
            key={commissioner._id}
            className="flex items-center p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            <input
              type="radio"
              name="commissioner"
              value={commissioner._id}
              onChange={() => handleRadioChange(commissioner)}
              className="mr-4 h-5 w-5 text-primary border-gray-300 focus:ring-primary transition duration-150"
            />
            <span className="text-gray-700 font-medium">
              {commissioner.first_name} {commissioner.last_name}
            </span>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No commissioners found. Please enter a search term.</p>
      )}
    </ul>
  )}

  <button
    onClick={handleAssignCommissioner}
    className={`mt-4 w-full bg-secondary text-white px-6 py-3 rounded-lg transition-colors duration-200 hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary ${
      (!selectedCommissionerName || loadingAssign) ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled={!selectedCommissionerName || loadingAssign}
  >
    {loadingAssign ? 'Assigning...' : 'Assign Commissioner'}
  </button>
</div>

    </div>
  );
};

export default PassportApplication;
