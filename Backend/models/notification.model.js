// FILE: models/notification.model.js

const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    readAt: {
        type: Date,
        default: null
    }
}, { _id: false });

const notificationSchema = new mongoose.Schema({
    sender: { // The user who sent the notification (e.g., the Host)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipients: [recipientSchema], // The users who receive the notification
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            'NEW_VISIT_REQUEST',
            'VISIT_APPROVED',
            'VISIT_REJECTED',
            'VISITOR_CHECKED_IN',
            'VISITOR_CHECKED_OUT',
            'HOST_ALERT'
        ],
        required: true
    },
    visit: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit'
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);