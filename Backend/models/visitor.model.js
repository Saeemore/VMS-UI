const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, sparse: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, sparse: true },
    organization: { type: String },

    selfie: {
        data: Buffer,
        contentType: String
    },

    aadhar: {
        data: Buffer,
        contentType: String
    },

    // ⭐ ADD THESE FIELDS FOR SCANNING SYSTEM
    qrString: { type: String, unique: true, sparse: true },  
    manualCode: { type: String },   // 6-digit code
    status: { type: String, default: "pending" } // pending / checked-in

}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);
