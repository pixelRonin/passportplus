import React from 'react';
import ParentInfoFields from './ParentInfoFields';
import CitizenshipQuestions from './CitizenshipQuestions';
import SupplementaryInfo from './SupplementaryInfo';

const EvidenceOfCitizenshipSection = ({ formData, handleChange, sectionVisibility, toggleSection }) => (
  <div className="border rounded-lg mb-2">
    <button
      type="button"
      className="w-full bg-gray-100 p-2 text-left flex justify-between items-center text-sm"
      onClick={() => toggleSection('evidenceOfCitizenship')}
    >
      <span className="font-semibold">Evidence of Citizenship</span>
      <span>{sectionVisibility.evidenceOfCitizenship ? '-' : '+'}</span>
    </button>
    {sectionVisibility.evidenceOfCitizenship && (
      <div className="p-2 space-y-4">
        <ParentInfoFields
          formData={formData}
          handleChange={handleChange}
        />
        <CitizenshipQuestions
          formData={formData}
          handleChange={handleChange}
        />
        <SupplementaryInfo
          formData={formData}
          handleChange={handleChange}
        />
      </div>
    )}
  </div>
);

export default EvidenceOfCitizenshipSection;
