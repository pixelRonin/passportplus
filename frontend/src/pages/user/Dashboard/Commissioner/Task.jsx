import React, { useState, useEffect } from 'react';
import userServices from '../../../../services/userService'; // Adjust path as needed
import { useAuth } from '../../../../context/AuthContext'; // Import useAuth from AuthContext

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user info from AuthContext
  const { user } = useAuth();
  
  
  useEffect(() => {
    // Fetch the list of users assigned to this commissioner
    const fetchUsers = async () => {
      try {
        // Assuming the API returns users assigned to the current commissioner
        const response = await userServices.getUsersAssignedToCommissioner(user.id);
        console.log(response.applicants);

        const userArray = response.applicants.map(applicant => ({
          id: applicant._id, // ID of the applicant
          name: `${applicant.first_name} ${applicant.last_name}`, // Full name
          email: applicant.email, // Email of the applicant
          passportStatus: response.passportApplication && response.passportApplication.user.toString() === applicant._id.toString()
              ? "Submitted" // Customize passport status conditionally
              : "Not Submitted"
      }));
      
        
       
        setUsers(userArray); // Assuming the data is in response.data
        
      } catch (err) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800"> Passport Verification</h1>
      
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500 font-medium">{error}</p>}
      
      {!loading && !error && users.length === 0 && (
        <p className="text-gray-600">No users assigned for verification.</p>
      )}
      {}
      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 border-b">Name</th>
                <th className="py-3 px-6 text-left text-gray-700 border-b">Email</th>
                <th className="py-3 px-6 text-left text-gray-700 border-b">Passport Application Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-600 border-b">{user.name}</td>
                  <td className="py-3 px-6 text-gray-600 border-b">{user.email}</td>
                  <td className="py-3 px-6 text-gray-600 border-b">{user.passportStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
