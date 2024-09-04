import React, { useState, useEffect } from 'react';
import { getAdminProfile } from '../../../../services/AdminService'; // Adjust the path as necessary

const AdminHome = () => {
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await getAdminProfile(); // Use the AdminService function
        const { first_name, last_name } = response.data;
        setAdminName(`${first_name} ${last_name}`);
      } catch (error) {
        console.error('Error fetching admin profile data:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">
        Welcome, {adminName || 'Admin'}
      </h1>
      <p className="mt-4 text-center">
        Here’s an overview of your administrative activities.
      </p>
      {/* You can add more components or admin-specific content here */}
    </div>
  );
};

export default AdminHome;
