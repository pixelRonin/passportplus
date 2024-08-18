const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userSchema'); // Adjust the path if necessary
const Role = require('./models/roleSchema'); // Adjust the path if necessary

require('dotenv').config(); // Load environment variables

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if admin role already exists
        const existingRole = await Role.findOne({ name: 'admin' });
        if (!existingRole) {
            // Create the admin role if it doesn't exist
            const role = new Role({
                name: 'admin',
                privileges: ['view_dashboard', 'manage_users', 'approve_submissions'] // Add relevant privileges
            });

            await role.save();
            console.log('Admin role created successfully.');
        }

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        // Retrieve the admin role
        const adminRole = await Role.findOne({ name: 'admin' });

        // Create a new admin user
        const hashedPassword = await bcrypt.hash('@iamAdmin1', 10); // Use the same password

        const admin = new User({
            first_name: 'Root',
            last_name: 'Admin',
            email: 'admin@example.com', // Use the same email
            password: hashedPassword,
            role: adminRole._id // Assign the admin role ID to the user
        });

        await admin.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    } finally {
        // Close MongoDB connection
        mongoose.connection.close();
    }
};

createAdmin();
