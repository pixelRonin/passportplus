// middleware/uploadMiddleware.js
const { IncomingForm } = require('formidable'); // Import the IncomingForm class
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

const uploadMiddleware = (req, res, next) => {
    // Create an instance of the IncomingForm
    const form = new IncomingForm({
        multiples: true, // Allow multiple files
        maxFileSize: 20 * 1024 * 1024, // 20MB max file size
        maxFields: 10, // Max number of fields allowed in the form
    });

    // Parse the incoming request containing the form data
    form.parse(req, (err, fields, files) => {
        if (err) {
            // Handle errors gracefully
            return res.status(400).json({
                success: false,
                message: 'Error parsing the uploaded files. Ensure the file size is within limit and the format is correct.',
                error: err.message,
            });
        }

        // Log fields and files to ensure they're being parsed correctly
        console.log('Parsed Fields:', fields);
        console.log('Parsed Files:', files);

        // Extract the token from headers (assuming it's sent in the Authorization header)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is missing or invalid',
            });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        try {
            // Decode the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Log the decoded token to inspect its structure
            console.log('Decoded Token:', decodedToken);

            // Extract userId from the decoded token
            const { userId } = decodedToken;

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'userId is missing from the token',
                });
            }

            // Attach userId to the request object
            req.userId = userId;

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
                error: error.message,
            });
        }

        // Check if files are present
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files provided. Please upload at least one file.',
            });
        }

        // Attach parsed data to the request object
        req.files = files;
        req.body = fields;

        // Proceed to the next middleware or controller
        next();
    });
};

module.exports = uploadMiddleware;
