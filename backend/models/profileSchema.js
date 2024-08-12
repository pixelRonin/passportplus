const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    age: {
        type: Number,
        min: 0, // Ensure age is non-negative
    },
    gender: {
        type: String,
        enum: ['male', 'female'], // Predefined gender options
    },
    phone_number: {
        type: String,
        validate: {
            validator: function(v) {
                // Simple regex for phone number validation
                return /^(?:\+?\d{1,3})?\s?\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    province: {
        type: String,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields for profile
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
