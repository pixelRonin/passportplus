import React, { useState, useEffect } from 'react';
import userServices from '../../../../services/userService';

const PassportApplication = ({ userId }) => {
  const [applicationData, setApplicationData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [commissioners, setCommissioners] = useState([]);
  const [selectedCommissioner, setSelectedCommissioner] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingCommissioners, setLoadingCommissioners] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCommissionerRole, setSelectedCommissionerRole] = useState('');

  // Fetch application data
  useEffect(() => {
    const fetchApplicationData = async () => {
      setLoading(true);
      try {
        const data = await userServices.getPassportApplication(userId);
        setApplicationData(data);
      } catch (err) {
        setError('Error fetching application data');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [userId]);

  // Search commissioners
  const searchCommissioners = async () => {
    if (searchQuery.trim()) {
      setLoadingCommissioners(true);
      try {
        const data = await userServices.searchCommissioners(searchQuery);
        console.log('API Response:', data); // Log the response to understand its structure

        // No need to extract `user` if the response is already an array of commissioners
        setCommissioners(data || []);
      } catch (err) {
        setError('Error fetching commissioners');
      } finally {
        setLoadingCommissioners(false);
      }
    } else {
      setCommissioners([]);
    }
  };

  const handleAssignCommissioner = async () => {
    if (!selectedCommissionerRole) {
      setError('Please select a commissioner');
      return;
    }
  
    setLoadingAssign(true);
    try {
      // Sending the userId and selectedCommissionerRole to the backend
      const response = await userServices.assignCommissioner(userId, selectedCommissionerRole);
      alert('Commissioner assigned successfully');
      setSelectedCommissionerRole('');
    } catch (err) {
      setError('Error assigning commissioner');
    } finally {
      setLoadingAssign(false);
    }
  };
  
  // Render loading, error, or content
  if (loading) {
    return <div className="text-center text-primary">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-primary mb-4">Passport Application Details</h1>

      {/* Application Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-2">Application Summary</h2>
        <p><strong>Travel Document Type:</strong> {applicationData?.passportApplication?.travelDocumentType || 'N/A'}</p>
        <p><strong>Height:</strong> {applicationData?.passportApplication?.height || 'N/A'} cm</p>
        <p><strong>Hair Color:</strong> {applicationData?.passportApplication?.hairColor || 'N/A'}</p>
        <p><strong>Eye Color:</strong> {applicationData?.passportApplication?.eyeColor || 'N/A'}</p>
        <p><strong>Occupation:</strong> {applicationData?.passportApplication?.occupation || 'N/A'}</p>
        <p><strong>Marital Status:</strong> {applicationData?.passportApplication?.maritalStatus || 'N/A'}</p>
        <p><strong>Residential Address:</strong> {applicationData?.passportApplication?.residentialAddress || 'N/A'}</p>
      </div>

      {/* Uploaded Documents */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-2">Uploaded Documents</h2>
        <div className="flex flex-wrap">
          {applicationData?.documents?.files?.length > 0 ? (
            applicationData.documents.files.map((file, index) => (
              <div key={index} className="w-1/3 p-2">
                <img
                  src={file.url} // Ensure URL is correct
                  alt={`Document ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ))
          ) : (
            <p>No documents uploaded</p>
          )}
        </div>
      </div>

      {/* Search and Assign Commissioner */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-2">Assign Commissioner of Oath</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search for commissioners"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mr-2"
          />
          <button
            onClick={searchCommissioners} // Corrected to trigger search
            className="bg-primary text-white px-4 py-2 rounded-lg"
            disabled={loadingCommissioners}
          >
            Search
          </button>
        </div>

        {loadingCommissioners && <div>Loading commissioners...</div>}

        {commissioners.map((commissioner) => (
  <li key={commissioner._id} className="my-2">
    <label className="flex items-center">
      <input
        type="radio"
        value={commissioner.role} // Ensure this captures the commissioner's role
        checked={selectedCommissionerRole === commissioner.role}
        onChange={() => setSelectedCommissionerRole(commissioner.role)} // Update selected role
        className="mr-2"
      />
      {commissioner.first_name} {commissioner.last_name}
    </label>
  </li>
))}

        <button
          onClick={handleAssignCommissioner}
          className="bg-secondary text-white px-6 py-2 rounded-lg"
          disabled={!selectedCommissioner || loadingAssign}
        >
          {loadingAssign ? 'Assigning...' : 'Assign Commissioner'}
        </button>
      </div>
    </div>
  );
};

export default PassportApplication;
