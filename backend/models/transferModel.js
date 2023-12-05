const mongoose = require('mongoose');

const transferSchema = mongoose.Schema(
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
        fromAddress: {
            type: String,
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        toUser: {
            type: String,
            require: true,
        },
        tx_id: {
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

module.exports = mongoose.model('Transfer', transferSchema);