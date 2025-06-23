const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Có thể là string, number, object, array
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware để update updatedAt
settingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;