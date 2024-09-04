import React from 'react';

const SupplementaryInfo = ({ formData, handleChange }) => (
  <div>
    <label className="block text-gray-700">Supplementary Information:</label>
    <textarea
      name="supplementaryInfo"
      value={formData.supplementaryInfo}
      onChange={handleChange}
      placeholder="Provide any additional information here"
      className="w-full p-1 border rounded-lg text-xs"
    />
  </div>
);

export default SupplementaryInfo;
