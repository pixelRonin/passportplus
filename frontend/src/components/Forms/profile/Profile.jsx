import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import userServices from '../../../services/userService'; // Correct import of the user service

const Profile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile data using the service function
    userServices.getUserProfile()
      .then(response => {
        const data = response.data;
        setProfile(data);
        
        // Set form values
        setValue('first_name', data.first_name);
        setValue('last_name', data.last_name);
        setValue('email', data.email);
        setValue('age', data.profile.age);
        setValue('gender', data.profile.gender);
        setValue('phone_number', data.profile.phone_number);
        setValue('province', data.profile.province);
        setValue('date_of_birth', data.profile.date_of_birth ? new Date(data.profile.date_of_birth).toISOString().substring(0, 10) : '');
        setValue('place_of_birth_village', data.profile.place_of_birth.village);
        setValue('place_of_birth_town', data.profile.place_of_birth.town);
        setValue('place_of_birth_province', data.profile.place_of_birth.province);
        setValue('place_of_birth_country', data.profile.place_of_birth.country);
      })
      .catch(error => console.error('Error fetching profile data:', error));
  }, [setValue]);

  const onSubmit = (data) => {
    // Format date_of_birth as Date object
    const updatedProfile = {
      ...data,
      date_of_birth: new Date(data.date_of_birth),
      place_of_birth: {
        village: data.place_of_birth_village,
        town: data.place_of_birth_town,
        province: data.place_of_birth_province,
        country: data.place_of_birth_country
      }
    };

    // Update profile data using the service function
    userServices.updateUserProfile(updatedProfile)
      .then(() => alert('Profile updated successfully!'))
      .catch(error => console.error('Error updating profile:', error));
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-gray-50 shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Personal Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              {...register('first_name', { required: 'First name is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.first_name && <p className="text-red-600 text-sm mt-1">{errors.first_name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              {...register('last_name', { required: 'Last name is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.last_name && <p className="text-red-600 text-sm mt-1">{errors.last_name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              {...register('phone_number')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              {...register('gender')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              {...register('age')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Province</label>
            <input
              type="text"
              {...register('province')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Date of Birth</label>
            <input
              type="date"
              {...register('date_of_birth')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Place of Birth */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Place of Birth</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Village</label>
            <input
              type="text"
              {...register('place_of_birth_village')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Town</label>
            <input
              type="text"
              {...register('place_of_birth_town')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Province</label>
            <input
              type="text"
              {...register('place_of_birth_province')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Country</label>
            <input
              type="text"
              {...register('place_of_birth_country')}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
        Save Changes
      </button>
    </form>
  );
};

export default Profile;
