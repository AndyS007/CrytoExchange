const mongoose = require('mongoose');

const walletSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        currency: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        privateKey: {
            type: String,
            require: true,
        },
        balance: {
            type: Number,
            require: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Wallet', walletSchema);