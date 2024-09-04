import React from 'react';

const AgeConsentSection = ({ formData, handleChange, sectionVisibility, toggleSection }) => (
  <div className="border rounded-lg mb-2">
    <button
      type="button"
      className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
      onClick={() => toggleSection('ageConsent')}
    >
      <span className="font-semibold">Consent Information</span>
      <span>{sectionVisibility.ageConsent ? '-' : '+'}</span>
    </button>
    {sectionVisibility.ageConsent && (
      <div className="p-2 text-sm">
        {/* Age Consent Section */}
        <div>
          <label className="block text-gray-700">Is the applicant under 17 years of age?</label>
          <select
            name="isUnder17"
            value={formData.isUnder17}
            onChange={handleChange}
            className="w-full p-1 border rounded-lg text-xs"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Conditional Consent Section */}
        {formData.isUnder17 === 'yes' && (
          <div className="mt-4">
            <label className="block text-gray-700">
              If the applicant is under 17 years of age, please provide consent to the application:
            </label>
            <textarea
              name="consentDetails"
              value={formData.consentDetails}
              onChange={handleChange}
              placeholder="Provide details or attach consent form"
              className="w-full p-1 border rounded-lg text-xs"
            />
          </div>
        )}
      </div>
    )}
  </div>
);

export default AgeConsentSection;
