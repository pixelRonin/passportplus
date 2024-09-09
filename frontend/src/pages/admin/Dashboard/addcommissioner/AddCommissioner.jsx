import React from 'react';

const AddCommissioner = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Commissioner of Oaths</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            id="phone"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter phone number"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Commissioner
        </button>
      </form>
    </div>
  );
};

export default AddCommissioner;
