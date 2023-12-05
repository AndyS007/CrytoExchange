const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        tx_id: {
            type: String,
            require: true,
        },
        pair: {
            type: String,
            require: true,
        },
        tx: {
            type: Object,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Transaction', transactionSchema);