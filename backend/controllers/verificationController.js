const asyncHandler = require('express-async-handler');
const Verification = require('../models/verificationModel');
const jwt = require('jsonwebtoken');

// @desc Verify a user
// @route POST /api/verification/verify
// @access Public
const verify = asyncHandler( async (req, res) => {
    const { legalName, country, phone, identity } = req.body;

    if (!legalName || !country || !phone || !identity) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const verified = await Verification.find({ user: req.user.id});

    if (verified.length > 0) {
        console.log(verified);
        res.status(200).json(verified);
    }else {
        const newVerification = await Verification.create({
            user: req.user.id,
            legalName,
            country,
            phone,
            identity
        });
    
        res.status(200).json(newVerification);
    }
})

module.exports = {
    verify
}


