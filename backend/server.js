// Importing Express Framework
const express = require('express');
// Importing Mongoose to help mongoDB achieve 
const mongoose = require('mongoose');
// Importing cross-origin-resource-sharing 
const cors = require('cors'); 
// Importing .env file 
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

// Routes
app.use('/api/users', require('./routes/userRoutes')); 

// Start Server 
app.listen(process.env.PORT, () => {
    console.log('Server running on Port', process.env.PORT);
});

