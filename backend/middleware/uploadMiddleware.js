// middleware/uploadMiddleware.js
const formidable = require('formidable');
const path = require('path');

const uploadMiddleware = (req, res, next) => {
    const form = new formidable.IncomingForm({
        uploadDir: path.join(__dirname, '../uploads'), // Directory to save files
        keepExtensions: true, // Keep file extensions
        multiples: true // Allow multiple files
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error processing files',
            });
        }

        if (!files.files || !fields.names) {
            return res.status(400).json({
                success: false,
                message: 'No files or names provided',
            });
        }

        req.files = files.files;
        req.names = fields.names;

        next();
    });
};

module.exports = uploadMiddleware;
