import React from 'react';

// Mock data to simulate application status
const mockStatusData = {
  applicationId: '1234567890',
  status: 'Under Review',
  submittedDate: '2024-08-01',
  expectedProcessingTime: '2-4 weeks',
  comments: 'Your application is currently being reviewed by our team. We will notify you once there are updates.'
};

const ApplicationStatus = () => {
  // Component rendering
  return (
    <div className="p-6 bg-white shadow-md rounded-lg min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Application Status</h1>
      <p className="mt-4 text-gray-600">
        Below you can find the current status of your application. For further assistance, please contact support.
      </p>

      <div className="mt-6 space-y-4">
        {/* Application ID */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Application ID</h2>
          <p className="text-gray-800">{mockStatusData.applicationId}</p>
        </div>

        {/* Status */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Status</h2>
          <p className={`text-gray-800 ${mockStatusData.status === 'Under Review' ? 'text-yellow-600' : 'text-green-600'}`}>
            {mockStatusData.status}
          </p>
        </div>

        {/* Submitted Date */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Submitted Date</h2>
          <p className="text-gray-800">{mockStatusData.submittedDate}</p>
        </div>

        {/* Expected Processing Time */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Expected Processing Time</h2>
          <p className="text-gray-800">{mockStatusData.expectedProcessingTime}</p>
        </div>

        {/* Comments */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Comments</h2>
          <p className="text-gray-800">{mockStatusData.comments}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
