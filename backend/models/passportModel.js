const mongoose = require('mongoose');

// Define the schema for the passport application
const passportApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Core Fields
    travelDocumentType: {
        type: String,
        enum: ['Standard Passport', 'Official Passport', 'Certificate of Identity', 'Diplomatic Passport', 'Emergency Travel Document'],
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    hairColor: {
        type: String,
        required: true
    },
    eyeColor: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        enum: ['Engineer','Doctor','Teacher', 'Artist', 'Other'],
        required: true
    },
    maritalStatus: {
        type: String,
        enum: ['Married', 'Single'],
        required: true
    },
    residentialAddress: {
        type: String,
        required: true
    },

    // Age Consent Section
    ageConsent: {
        isUnder17: {
            type: Boolean
        },
        consentDetails: {
            type: String // Optional field to provide details if the applicant is under 17
        }
    },

    // Travel Details Section
    departureDetails: {
        vesselOrAirline: {
            type: String
        },
        portOrAirport: {
            type: String
        },
        countriesToVisit: {
            type: String
        },
        departureDate: {
            type: Date
        }
    },

    // Evidence of Citizenship Section
    evidenceOfCitizenship: {
        mother: {
            name: {
                type: String
            },
            dateOfBirth: {
                type: Date
            },
            placeOfBirthCitizenship: {
                type: String
            }
        },
        father: {
            name: {
                type: String
            },
            dateOfBirth: {
                type: Date
            },
            placeOfBirthCitizenship: {
                type: String
            }
        },
        citizenshipQuestions: {
            livedInPNG: {
                type: String,
                enum: ['yes', 'no']
            },
            citizenOfPNG: {
                type: String,
                enum: ['yes', 'no']
            },
            citizenOfForeignCountry: {
                type: String,
                enum: ['yes', 'no']
            }
        }
    },

    // Declaration Section
    declaration: {
        type: Boolean,
        required: true // Boolean to confirm the applicant's declaration of accuracy
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const PassportApplication = mongoose.model('PassportApplication', passportApplicationSchema);

module.exports = PassportApplication;
