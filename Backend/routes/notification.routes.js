// FILE: routes/notification.routes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { 
    // getMyNotifications, 
    markAsRead, 
    markAllAsRead,
    getSentNotifications,
    getNotifications 
} = require('../controllers/notification.controller');

router.use(protect); // All routes in this file are protected

// router.get('/', getMyNotifications);
router.patch('/:id/read', markAsRead);
router.patch('/read/all', markAllAsRead);
router.get('/', getNotifications); // Inbox
router.get('/sent', getSentNotifications); // Sent Box

module.exports = router;