const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'client name is missing'],
    },
    adicionalInfo: {
        type: String,
        required: [false,'adicionalInfo is missing'],
        default: '',
    },
    apiKey: {
        type: String,
        required: [true, 'apiKey is missing'],
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
