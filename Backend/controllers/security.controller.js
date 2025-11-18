// FILE: controllers/security.controller.js

const Visit = require('../models/visit.model');
const Visitor = require('../models/visitor.model');
const User = require('../models/user.model');
const Notification = require('../models/notification.model');
const AuditLog = require('../models/auditLog.model');
const { startOfToday, endOfToday } = require('date-fns');

/*  
===========================================================
  1) VALIDATE PASS (QR or Manual Code)
===========================================================
*/
exports.validateVisit = async (req, res) => {
    try {
        const { pass } = req.body;

        if (!pass) {
            return res.status(400).json({ message: "Pass code is required." });
        }

        const visit = await Visit.findOne({
            pass_code: pass,
            company: req.user.company
        })
            .populate('visitor', 'name selfie phone email')
            .populate('host', 'name department')
            .populate('company', 'name');

        // No pass found
        if (!visit) {
            return res.status(404).json({
                message: "Invalid pass, or visit is not approved/scheduled for your company."
            });
        }

        // Visit must be APPROVED or SCHEDULED
        if (!["APPROVED", "SCHEDULED"].includes(visit.status)) {
            return res.status(400).json({
                message: "Visit is not approved or already processed."
            });
        }

        // Must be scheduled for TODAY
        const today = new Date().toDateString();
        const visitDay = new Date(visit.scheduled_at).toDateString();
        if (today !== visitDay) {
            return res.status(400).json({
                message: "Visit is not scheduled for today."
            });
        }

        // Already checked-in
        if (visit.status === "CHECKED_IN") {
            return res.status(400).json({
                message: "Visitor already checked in."
            });
        }

        // Validation success
        return res.json({
            success: true,
            visit
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

/*  
===========================================================
  2) CHECK-IN VISITOR
===========================================================
*/
exports.checkIn = async (req, res) => {
    const { pass_code } = req.body;

    try {
        const visit = await Visit.findOneAndUpdate(
            {
                pass_code,
                company: req.user.company,
                status: { $in: ['APPROVED', 'SCHEDULED'] }
            },
            { status: 'CHECKED_IN', checkin_time: new Date() },
            { new: true }
        );

        if (!visit)
            return res.status(404).json({
                message: 'Invalid pass, or visit is not approved/scheduled for your company.'
            });

        // Notify host
        await Notification.create({
            sender: req.user._id,
            recipients: [{ user: visit.host }],
            message: `${visit.visitorName} has checked in to see you.`,
            visit: visit._id,
            type: 'VISITOR_CHECKED_IN'
        });

        // Audit log
        await AuditLog.create({
            actor: req.user._id,
            action: 'VISIT_CHECKED_IN',
            details: `Security ${req.user.name} checked in ${visit.visitorName}.`,
            visit: visit._id
        });

        res.json({ message: 'Visitor checked in successfully.', visit });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/*  
===========================================================
  3) CHECK-OUT VISITOR
===========================================================
*/
exports.checkOut = async (req, res) => {
    try {
        const visit = await Visit.findOneAndUpdate(
            { _id: req.params.id, company: req.user.company, status: 'CHECKED_IN' },
            { status: 'CHECKED_OUT', checkout_time: new Date() },
            { new: true }
        );

        if (!visit)
            return res.status(404).json({
                message: 'Visit not found or visitor is not checked in.'
            });

        await Notification.create({
            sender: req.user._id,
            recipients: [{ user: visit.host }],
            message: `${visit.visitorName} has checked out.`,
            visit: visit._id,
            type: 'VISITOR_CHECKED_OUT'
        });

        await AuditLog.create({
            actor: req.user._id,
            action: 'VISIT_CHECKED_OUT',
            details: `Security ${req.user.name} checked out ${visit.visitorName}.`,
            visit: visit._id
        });

        res.json({ message: 'Visitor checked out successfully.', visit });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/*  
===========================================================
  4) EXPECTED VISITS (TODAY)
===========================================================
*/
exports.getExpectedVisits = async (req, res) => {
    try {
        const todayStart = startOfToday();
        const todayEnd = endOfToday();

        const visits = await Visit.find({
            status: { $in: ['APPROVED', 'SCHEDULED'] },
            scheduled_at: { $gte: todayStart, $lte: todayEnd },
            company: req.user.company
        })
            .sort({ scheduled_at: 1 })
            .populate('visitor', 'name selfie')
            .populate('host', 'name department');

        res.json(visits);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/*  
===========================================================
  5) GET CHECKED-IN VISITORS
===========================================================
*/
exports.getCheckedInVisits = async (req, res) => {
    try {
        const visits = await Visit.find({
            company: req.user.company,
            status: 'CHECKED_IN'
        })
            .sort({ checkin_time: -1 })
            .populate('visitor', 'name selfie')
            .populate('host', 'name department');

        res.json(visits);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/*  
===========================================================
  6) GET TODAY'S CHECKED-OUT VISITORS
===========================================================
*/
exports.getTodaysCheckedOut = async (req, res) => {
    try {
        const todayStart = startOfToday();
        const todayEnd = endOfToday();

        const visits = await Visit.find({
            status: 'CHECKED_OUT',
            checkout_time: { $gte: todayStart, $lte: todayEnd },
            company: req.user.company
        })
            .sort({ checkout_time: -1 })
            .populate('visitor', 'name selfie')
            .populate('host', 'name department');

        res.json(visits);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
