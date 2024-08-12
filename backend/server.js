const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // This will allow all origins by default
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); // line for admin routes

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Use template literals for variable
});
