// utils/passwordUtils.js

const bcrypt = require('bcryptjs');

/**
 * Compare a candidate password with a hashed password.
 * @param {string} candidatePassword - The password provided by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Returns true if passwords match, false otherwise.
 */
const comparePasswords = async (candidatePassword, hashedPassword) => {
    try {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error.message);
        throw new Error('Password comparison failed');
    }
};

module.exports = {
    comparePasswords,
};
