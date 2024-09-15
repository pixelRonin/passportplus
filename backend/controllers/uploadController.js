// controllers/uploadController.js
const cloudinary = require('../utils/cloudinary');
const Uploads = require('../models/uploadsModel'); // Import the updated model
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

exports.uploadFiles = async (req, res) => {
    // Ensure files, names, and userId are present
    if (!req.files || !req.body.names || !req.userId) {
        console.log('Missing data:', {
            files: req.files,
            names: req.body.names,
            userId: req.userId
        }); // Log for debugging

        return res.status(400).json({
            success: false,
            message: 'Files, names, or userId missing',
        });
    }

    // Parse names if they are coming as a JSON string
    let namesArray;
    try {
        namesArray = JSON.parse(req.body.names);
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: 'Error parsing names',
        });
    }

    // Log files and names to inspect structure
    console.log('Parsed Names Array:', namesArray);
    console.log('Raw Files Data:', req.files);

    // Extract file objects from request
    const filesArray = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    // Log the number of files and names
    console.log('Number of Files:', filesArray.length);
    console.log('Number of Names:', namesArray.length);

    if (filesArray.length !== namesArray.length) {
        return res.status(400).json({
            success: false,
            message: `Files and names count mismatch. Files: ${filesArray.length}, Names: ${namesArray.length}`,
        });
    }

    const uploadPromises = filesArray.map((file, index) => {
        const name = namesArray[index] || `file-${Date.now()}`;
        const ext = path.extname(file.filepath);

        if (!file.filepath) {
            return Promise.reject(new Error(`No filepath for file index ${index}`));
        }

        // Upload to Cloudinary
        return cloudinary.uploader.upload(file.filepath, {
            public_id: name,
            resource_type: file.mimetype.includes('pdf') ? 'raw' : 'image',
        })
        .then(result => ({ name, result }))
        .catch(err => ({ name, error: err }));
    });

    try {
        const results = await Promise.all(uploadPromises);
        const successResults = results.filter(r => r.result);
        const errors = results.filter(r => r.error);

        if (errors.length > 0) {
            return res.status(500).json({
                success: false,
                message: 'Some files could not be uploaded',
                errors
            });
        }

        await Uploads.create({
            applicantId: req.userId,  // Use userId instead of applicantId
            files: successResults.map(r => ({
                url: r.result.secure_url,
                public_id: r.result.public_id,
                name: r.name
            }))
        });

        res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            data: successResults.map(r => r.result.secure_url)
        });
    } catch (err) {
        console.error('Error uploading files:', err);
        res.status(500).json({
            success: false,
            message: 'Error uploading files',
        });
    }
};
