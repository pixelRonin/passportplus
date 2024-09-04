import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext'; // Import your authentication context

const Profile = () => {
  const user = useAuth(); // Get the user object from context
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user || !user._id) return;

    // Fetch user profile data using user._id
    axios.get(`/api/user/profile`) // Use endpoint for current user profile
      .then(response => {
        setProfile(response.data);
        // Set form values
        setValue('first_name', response.data.first_name);
        setValue('last_name', response.data.last_name);
        setValue('email', response.data.email);
        setValue('profile.gender', response.data.profile.gender);
        setValue('profile.phone_number', response.data.profile.phone_number);
        setValue('profile.province', response.data.profile.province);
        setValue('profile.date_of_birth', response.data.profile.date_of_birth.slice(0, 10)); // Format date
        setValue('profile.place_of_birth.village', response.data.profile.place_of_birth.village);
        setValue('profile.place_of_birth.town', response.data.profile.place_of_birth.town);
        setValue('profile.place_of_birth.province', response.data.profile.place_of_birth.province);
        setValue('profile.place_of_birth.country', response.data.profile.place_of_birth.country);
      })
      .catch(error => console.error('Error fetching profile data:', error));
  }, [user, setValue]);

  // Watch the date of birth field to automatically calculate age
  const dateOfBirth = watch('profile.date_of_birth');
  useEffect(() => {
    if (dateOfBirth) {
      const age = calculateAge(dateOfBirth);
      setValue('profile.age', age);
    }
  }, [dateOfBirth, setValue]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const onSubmit = (data) => {
    // Send updated data to the server
    axios.post('/api/user/update-profile', data)
      .then(response => alert('Profile updated successfully!'))
      .catch(error => console.error('Error updating profile:', error));
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      {/* Personal Information */}
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          {...register('first_name', { required: 'First name is required' })}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
        {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          {...register('last_name', { required: 'Last name is required' })}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
        {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Profile Section */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Profile Details</h3>

        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            {...register('profile.age')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            {...register('profile.gender')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            {...register('profile.phone_number')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Province</label>
          <input
            type="text"
            {...register('profile.province')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            {...register('profile.date_of_birth')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold">Place of Birth</h4>
          <label className="block text-gray-700">Village</label>
          <input
            type="text"
            {...register('profile.place_of_birth.village')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />

          <label className="block text-gray-700 mt-2">Town</label>
          <input
            type="text"
            {...register('profile.place_of_birth.town')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />

          <label className="block text-gray-700 mt-2">Province</label>
          <input
            type="text"
            {...register('profile.place_of_birth.province')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />

          <label className="block text-gray-700 mt-2">Country</label>
          <input
            type="text"
            {...register('profile.place_of_birth.country')}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">
        Save Changes
      </button>
    </form>
  );
};

export default Profile;
