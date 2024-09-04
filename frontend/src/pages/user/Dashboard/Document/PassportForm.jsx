import React from 'react';
import PersonalInfoSection from './Sections/PersonalInfoSection';
import OccupationMaritalStatusSection from './Sections/OccupationMaritalStatusSection';
import AddressInfoSection from './Sections/AddressInfoSection';
import TravelDetailsSection from './Sections/TravelDetailsSection';
import PreviousTravelDocumentSection from './Sections/PreviousTravelDocumentSection';
import DeclarationSection from './Sections/DeclarationSection';
import AgeConsentSection from './Sections/AgeConsentSection';
import EvidenceOfCitizenshipSection from './Sections/EvidenceOfCitizenshipSection/EvidenceOfCitizenshipSection';

const PassportForm = ({ formData, handleChange, handleSubmit, sectionVisibility, toggleSection, formErrors }) => (
  <div className="h-[80vh] overflow-y-auto p-4 bg-white shadow-md rounded-lg">
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Passport Application</h1>
    <p className="text-gray-600 mb-2 text-sm">
      Fill out the form below to apply for your passport. Ensure all the information is accurate.
    </p>

    {formErrors && <p className="text-red-600 mb-2 text-sm">{formErrors}</p>}

    <form onSubmit={handleSubmit} className="space-y-2">
      <PersonalInfoSection 
        formData={formData} 
        handleChange={handleChange} 
        sectionVisibility={sectionVisibility}
        toggleSection={toggleSection}
      />
      <AgeConsentSection
       formData={formData} 
       handleChange={handleChange} 
       sectionVisibility={sectionVisibility}
       toggleSection={toggleSection}
      />
      <OccupationMaritalStatusSection 
        formData={formData} 
        handleChange={handleChange} 
        sectionVisibility={sectionVisibility}
        toggleSection={toggleSection}
      />
      <AddressInfoSection 
        formData={formData} 
        handleChange={handleChange} 
        sectionVisibility={sectionVisibility}
        toggleSection={toggleSection}
      />
      <TravelDetailsSection 
        formData={formData} 
        handleChange={handleChange} 
        sectionVisibility={sectionVisibility}
        toggleSection={toggleSection}
      />
      <PreviousTravelDocumentSection 
        formData={formData} 
        handleChange={handleChange} 
        sectionVisibility={sectionVisibility}
        toggleSection={toggleSection}
      />
      <EvidenceOfCitizenshipSection
        formData={formData}
        handleChange={handleChange}
        sectionVisibility={sectionVisibility}
        toggleSection={toggleSection}
      />
      <DeclarationSection 
        formData={formData} 
        handleChange={handleChange} 
        sectionVisibility={sectionVisibility}
        toggleSection={toggleSection}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm"
      >
        Submit Application
      </button>
    </form>
  </div>
);

export default PassportForm;
