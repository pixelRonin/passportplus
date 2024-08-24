// controllers/uploadController.js
const cloudinary = require('../utils/cloudinary');

exports.uploadFiles = (req, res) => {
    // Ensure files are present
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No files provided',
        });
    }

    // Upload images to Cloudinary
    const uploadPromises = [];

    if (req.files.image1) {
        uploadPromises.push(
            cloudinary.uploader.upload(req.files.image1[0].path)
                .then(result => ({ type: 'image1', result }))
                .catch(err => ({ type: 'image1', error: err }))
        );
    }

    if (req.files.image2) {
        uploadPromises.push(
            cloudinary.uploader.upload(req.files.image2[0].path)
                .then(result => ({ type: 'image2', result }))
                .catch(err => ({ type: 'image2', error: err }))
        );
    }

    if (req.files.pdf) {
        uploadPromises.push(
            cloudinary.uploader.upload(req.files.pdf[0].path, { resource_type: 'raw' })
                .then(result => ({ type: 'pdf', result }))
                .catch(err => ({ type: 'pdf', error: err }))
        );
    }

    Promise.all(uploadPromises)
        .then(results => {
            const successResults = results.filter(r => r.result);
            const errors = results.filter(r => r.error);

            if (errors.length > 0) {
                return res.status(500).json({
                    success: false,
                    message: 'Some files could not be uploaded',
                    errors
                });
            }

            res.status(200).json({
                success: true,
                message: 'Files uploaded successfully',
                data: successResults.map(r => r.result)
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Error uploading files',
            });
        });
};
