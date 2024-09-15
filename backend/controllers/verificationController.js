const mongoose = require('mongoose');
const User = require('../models/usersModel');
const Payment = require('../models/paymentsModel');
const Upload = require('../models/uploadsModel');
const PassportApplication = require('../models/passportModel');

const fetchCombinedDataForCommissioner = async (req, res) => {
    try {
        const id = req.params.id;  // Get the ID from the route parameters

        const userData = await User.findById(id);
        const paymentData = await Payment.findOne({ user: id });
        const uploadData = await Upload.find({ applicationId: id });
        const applicationData = await PassportApplication.findById(id).populate('user');

        // Combine the data
        const combinedData = {
            userData,
            paymentData,
            uploadData,
            applicationData,
        };

        // Send the combined data as a response
        res.status(200).json(combinedData);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Failed to fetch and combine data for Commissioner.' });
    }
};

const assignCommissioner = async (req, res) => {
    const { applicationId } = req.params;
    const { commissionerId } = req.body;  // Commissioner ID provided by the user

    // Validate if the applicationId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        return res.status(400).json({ message: 'Invalid application ID format' });
    }

    try {
        const application = await PassportApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Assign the commissioner to the application
        application.assignedCommissioner = commissionerId;
        await application.save();

        res.status(200).json({ message: 'Commissioner assigned successfully' });
    } catch (error) {
        console.error('Error assigning commissioner:', error);
        res.status(500).json({ message: 'Failed to assign commissioner' });
    }
};

const commissionerApprove = async (req, res) => {
    const { applicationId } = req.params;

    // Validate if the applicationId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
        return res.status(400).json({ message: 'Invalid application ID format' });
    }

    try {
        const application = await PassportApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Approve the application by commissioner
        application.isCommissionerApproved = true;
        await application.save();

        res.status(200).json({ message: 'Application approved by commissioner' });
    } catch (error) {
        console.error('Error approving application by commissioner:', error);
        res.status(500).json({ message: 'Failed to approve application by commissioner' });
    }
};



module.exports = {
    fetchCombinedDataForCommissioner,
    assignCommissioner,
    commissionerApprove
};
