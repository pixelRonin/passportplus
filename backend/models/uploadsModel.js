// models/uploadSchema.js
const mongoose = require('mongoose');
const fileSchema = require('./filesModel');

const uploadSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  files: [fileSchema],  // Array of file objects
});

module.exports = mongoose.model('Upload', uploadSchema);
