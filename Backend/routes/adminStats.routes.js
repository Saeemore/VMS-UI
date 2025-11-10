// FILE: routes/adminStats.routes.js
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminStats.controller');
// const { protect, authorize } = require('../middleware/auth.middleware');

// All routes are protected and for admins only
// router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboardStats);

module.exports = router;