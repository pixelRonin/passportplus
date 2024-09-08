const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  picture1: {
    type: String,  // Store Cloudinary URL
    required: true,
  },
  picture2: {
    type: String,  // Store Cloudinary URL
    required: true,
  },
  nidbirthCertificate: {
    type: String,  // Store Cloudinary URL
    required: true,
  },
});

const Uploads = mongoose.model('Uploads', uploadSchema);

module.exports = Uploads;
