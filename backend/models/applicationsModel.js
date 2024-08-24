const mongoose = require('mongoose');

// Define the simplified schema for the passport application
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
    correspondenceAddress: {
        type: String,
        required: true
    },
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
    previousTravelDocument: {
        issuedBefore: {
            type: Boolean,
            required: true
        },
        travelDocumentNumber: {
            type: String
        }
    },
    declaration: {
        declaredBy: {
            type: String,
            required: true
        },
        declarationDate: {
            type: Date,
            required: true
        },
        applicantSignature: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const PassportApplication = mongoose.model('PassportApplication', passportApplicationSchema);

module.exports = PassportApplication;
