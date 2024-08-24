// Importing Express Framework
const express = require('express');
// Importing Mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Importing cross-origin-resource-sharing
const cors = require('cors');
// Importing .env file for environment variables
require('dotenv').config();

// Create Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import and use routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/documents', uploadRoutes);

// Start Server
const PORT = process.env.PORT || 5000;  // Use 5000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
