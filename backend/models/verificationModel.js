const mongoose = require('mongoose');

const verificationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        legalName: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            require: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        identity: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Verification', verificationSchema);