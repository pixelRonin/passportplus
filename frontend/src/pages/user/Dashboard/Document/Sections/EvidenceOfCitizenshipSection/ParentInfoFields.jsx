import React from 'react';

const ParentInfoFields = ({ formData, handleChange }) => (
  <div className="space-y-4">
    {/* Mother's Information */}
    <div>
      <label className="block text-gray-700">Full name and date of birth of mother</label>
      <input
        type="text"
        name="motherNameDOB"
        value={formData.motherNameDOB}
        onChange={handleChange}
        placeholder="Full name and date of birth"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>
    <div>
      <label className="block text-gray-700">Place of birth and Citizenship of mother</label>
      <input
        type="text"
        name="motherPlaceOfBirthCitizenship"
        value={formData.motherPlaceOfBirthCitizenship}
        onChange={handleChange}
        placeholder="Place of birth and Citizenship"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>

    {/* Father's Information */}
    <div>
      <label className="block text-gray-700">Full name and date of birth of father</label>
      <input
        type="text"
        name="fatherNameDOB"
        value={formData.fatherNameDOB}
        onChange={handleChange}
        placeholder="Full name and date of birth"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>
    <div>
      <label className="block text-gray-700">Place of birth and Citizenship of father</label>
      <input
        type="text"
        name="fatherPlaceOfBirthCitizenship"
        value={formData.fatherPlaceOfBirthCitizenship}
        onChange={handleChange}
        placeholder="Place of birth and Citizenship"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>

    {/* Mother's Parents Information */}
    <div>
      <label className="block text-gray-700">Full name of mother’s parents</label>
      <input
        type="text"
        name="mothersParents"
        value={formData.mothersParents}
        onChange={handleChange}
        placeholder="Full name of mother’s parents"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>
    <div>
      <label className="block text-gray-700">Place of birth of mother’s parents</label>
      <input
        type="text"
        name="mothersParentsPlaceOfBirth"
        value={formData.mothersParentsPlaceOfBirth}
        onChange={handleChange}
        placeholder="Place of birth of mother’s parents"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>

    {/* Father's Parents Information */}
    <div>
      <label className="block text-gray-700">Full name of father’s parents</label>
      <input
        type="text"
        name="fathersParents"
        value={formData.fathersParents}
        onChange={handleChange}
        placeholder="Full name of father’s parents"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>
    <div>
      <label className="block text-gray-700">Place of birth of father’s parents</label>
      <input
        type="text"
        name="fathersParentsPlaceOfBirth"
        value={formData.fathersParentsPlaceOfBirth}
        onChange={handleChange}
        placeholder="Place of birth of father’s parents"
        className="w-full p-1 border rounded-lg text-xs"
      />
    </div>
  </div>
);

export default ParentInfoFields;
