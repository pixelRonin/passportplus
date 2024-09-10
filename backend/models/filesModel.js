// models/fileSchema.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  url: {
    type: String,  // Cloudinary URL
    required: true,
  },
  public_id: {
    type: String,  // Cloudinary public ID
    required: true,
  },
  name: {
    type: String,  // File name or identifier
    required: true,
  },
});

module.exports = fileSchema;
