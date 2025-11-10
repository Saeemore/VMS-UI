// FILE: routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { login, getMe, updatePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/login', login);
router.get('/me', protect, getMe);
router.patch('/update-password', protect, updatePassword);
module.exports = router;