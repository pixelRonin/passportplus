const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: function(req, file, cb) {
        // Create a unique filename with field name, timestamp, and original name
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

// Configure multer for file handling
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter: function(req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;