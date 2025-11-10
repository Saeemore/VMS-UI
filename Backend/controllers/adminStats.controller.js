// FILE: controllers/adminStats.controller.js
const Visit = require('../models/visit.model');
const User = require('../models/user.model');

// Get high-level stats for the admin dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Run all count queries in parallel for efficiency
        const [
            visitsToday,
            pendingApprovals,
            checkedInCount,
            totalUsers
        ] = await Promise.all([
            Visit.countDocuments({ scheduled_at: { $gte: todayStart, $lte: todayEnd } }),
            Visit.countDocuments({ status: 'AWAITING_APPROVAL' }),
            Visit.countDocuments({ status: 'CHECKED_IN' }),
            User.countDocuments()
        ]);

        res.json({
            visitsToday,
            pendingApprovals,
            checkedInCount,
            totalUsers
        });

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: 'Server error' });
    }
};