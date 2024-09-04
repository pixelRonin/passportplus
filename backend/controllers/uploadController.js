const cloudinary = require('../utils/cloudinary');

// Controller to handle file uploads
exports.uploadFiles = (req, res) => {
    // Ensure files are present
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No files provided',
        });
    }

    // Array to hold upload promises
    const uploadPromises = [];

    // Upload image1 if it exists
    if (req.files.image1) {
        uploadPromises.push(
            cloudinary.uploader.upload(req.files.image1[0].path)
                .then(result => ({ type: 'image1', result }))
                .catch(err => ({ type: 'image1', error: err }))
        );
    }

    // Upload image2 if it exists
    if (req.files.image2) {
        uploadPromises.push(
            cloudinary.uploader.upload(req.files.image2[0].path)
                .then(result => ({ type: 'image2', result }))
                .catch(err => ({ type: 'image2', error: err }))
        );
    }

    // Upload PDF if it exists
    if (req.files.pdf) {
        uploadPromises.push(
            cloudinary.uploader.upload(req.files.pdf[0].path, { resource_type: 'raw' })
                .then(result => ({ type: 'pdf', result }))
                .catch(err => ({ type: 'pdf', error: err }))
        );
    }

    // Wait for all uploads to finish
    Promise.all(uploadPromises)
        .then(results => {
            // Separate successful uploads from errors
            const successResults = results.filter(r => r.result);
            const errors = results.filter(r => r.error);

            if (errors.length > 0) {
                return res.status(500).json({
                    success: false,
                    message: 'Some files could not be uploaded',
                    errors
                });
            }

            // Respond with successful results
            res.status(200).json({
                success: true,
                message: 'Files uploaded successfully',
                data: successResults.map(r => r.result)
            });
        })
        .catch(err => {
            // Handle any unexpected errors
            console.error('Error uploading files:', err);
            res.status(500).json({
                success: false,
                message: 'Error uploading files',
            });
        });
};
