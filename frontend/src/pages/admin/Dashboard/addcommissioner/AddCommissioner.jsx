import React, { useState } from 'react';
import { searchUser, addCommissioner } from '../../../../services/adminService'; // Adjust the path as needed

const AddCommissioner = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // Function to search users based on name or email
  const handleSearchUser = async (e) => {
    e.preventDefault(); // Prevent the form from submitting
    console.log(`Searching for: ${query}`); // Log the query value

    try {
      const data = await searchUser(query);
      setUsers(data.users); // Set the search results
      if (data.users.length === 0) {
        setMessage('No users found.');
      } else {
        setMessage('');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('An error occurred while searching for users.');
    }
  };

  // Function to assign the Commissioner of Oath role
  const handleAssignCommissioner = async (userId) => {
    try {
      const data = await addCommissioner(userId);
      setMessage(data.success || data.error); // Display success or error message
      if (data.success) {
        setUsers([]); // Clear the search results after success
        setQuery(''); // Clear the search query
      }
    } catch (error) {
      console.error('Error assigning Commissioner of Oath:', error);
      setMessage('An error occurred while assigning the Commissioner of Oath.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Commissioner of Oaths</h1>

      {/* Form to Search for Users */}
      <form onSubmit={handleSearchUser}>
        <div className="mb-4">
          <label htmlFor="query" className="block text-gray-700">Search by Name or Email</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter name or email"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search User
        </button>
      </form>

      {/* Display Search Results */}
      {users.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Search Results</h2>
          <ul className="list-disc pl-5">
            {users.map(user => (
              <li key={user._id} className="mb-4 p-2 border-b">
                <div className="flex items-center">
                  <div className="mr-4">
                    <strong>{user.first_name} {user.last_name}</strong>
                  </div>
                  <div className="text-gray-600">
                    <div>Email: {user.email}</div>
                    <div>Phone: {user.phone_number}</div>
                    <div>Age: {user.age}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleAssignCommissioner(user._id)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add as Commissioner of Oath
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Messages */}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AddCommissioner;
