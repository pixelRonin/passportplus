// Importing mongoose to help mongoDB achieve schema like structure
const mongoose = require('mongoose');
// Importing libraries that help with authorization and authentication
//bcryptjs hashes passwords and saves them
const bcrypt = require('bcryptjs');
//Provides user with an authentic token
const jwt = require('jsonwebtoken');
// Enables use of the .env file without hardcoding 
require('dotenv').config();

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
        province: String,
        date_of_birth: Date, // Added date of birth field
        place_of_birth: {    // Added place of birth field
            village: String,
            town: String,
            province: String,
            country: String
        }
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    isEmailVerified: { 
        type: Boolean, 
        default: false 
    },
    emailConfirmationCode: {
        type: String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields for users
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { userId: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};



const User = mongoose.model('User', userSchema);


module.exports = User;
