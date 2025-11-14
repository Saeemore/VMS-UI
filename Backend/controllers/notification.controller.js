// FILE: controllers/notification.controller.js

const Notification = require('../models/notification.model');

// Get all (or unread) notifications for the logged-in user
exports.getMyNotifications = async (req, res) => {
    try {
        // Find notifications for the current user, newest first
        const notifications = await Notification.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to the 50 most recent notifications
        
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get notifications FOR the logged-in user (their INBOX)
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ 'recipients.user': req.user._id })
            .sort({ createdAt: -1 })
            .populate('sender', 'name');
        
        // Add a custom `isRead` field for the frontend based on this user's status
        const processedNotifications = notifications.map(n => {
            const recipientData = n.recipients.find(r => r.user.toString() === req.user._id.toString());
            return {
                ...n.toObject(),
                isRead: !!recipientData.readAt
            }
        });

        res.json(processedNotifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get notifications SENT BY the logged-in user (their SENT BOX)
exports.getSentNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ sender: req.user._id })
            .sort({ createdAt: -1 })
            .populate('recipients.user', 'name'); // Populate the user's name in the recipients array
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Mark a notification as read FOR THE CURRENT USER
exports.markAsRead = async (req, res) => {
    try {
        await Notification.updateOne(
            { _id: req.params.id, 'recipients.user': req.user._id },
            { $set: { 'recipients.$.readAt': new Date() } }
        );
        res.json({ message: 'Notification marked as read.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Mark all notifications as read FOR THE CURRENT USER
exports.markAllAsRead = async (req, res) => {
    try {
        // This is a complex operation with subdocuments. A loop is clearer here.
        const unreadNotifs = await Notification.find({ 'recipients.user': req.user._id, 'recipients.readAt': null });
        
        const updatePromises = unreadNotifs.map(notif => {
            return Notification.updateOne(
                { _id: notif._id, 'recipients.user': req.user._id },
                { $set: { 'recipients.$.readAt': new Date() } }
            );
        });
        
        await Promise.all(updatePromises);

        res.status(200).json({ message: 'All notifications marked as read.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};