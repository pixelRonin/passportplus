const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Ensure email is stored in lowercase
        validate: {
            validator: function(v) {
                // Basic email validation regex
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        age: Number,
        gender: String,
        phone_number: Number,
        province: String 
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Ensure the role is either 'user' or 'admin'
        default: 'user' // Default role is 'user'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields for user
});

const User = mongoose.model('User', userSchema);

module.exports = User;
