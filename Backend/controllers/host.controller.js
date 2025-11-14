// FILE: controllers/host.controller.js

const Visit = require('../models/visit.model');
const Visitor = require('../models/visitor.model');
const AuditLog = require('../models/auditLog.model');
const User = require('../models/user.model');
const Notification = require('../models/notification.model');
const sharp = require('sharp');
const { sendVisitPass } = require('../utils/email.util');
// Get all visit requests awaiting my approval
exports.getMyVisitRequests = async (req, res) => {
    try {
        const visits = await Visit.find({ host: req.user._id, status: 'AWAITING_APPROVAL' }).populate('visitor', 'name selfie').sort({ createdAt: -1 });
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get my upcoming (approved/scheduled) visits
exports.getUpcomingVisits = async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
         const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);
        const visits = await Visit.find({
            host: req.user._id,
            status: { $in: ['SCHEDULED', 'APPROVED'] },
            scheduled_at: { $gte: tomorrowStart }
        }).populate('visitor', 'name selfie').sort({ scheduled_at: 1 });
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Expectedvisit today
exports.getExpectedVisits = async (req, res) => {
    try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const visits = await Visit.find({
        host: req.user._id,
        status: { $in: ['SCHEDULED', 'APPROVED'] },
        scheduled_at: { $gte: todayStart, $lte: todayEnd }
    })
    .populate('visitor', 'name selfie')
    .sort({ scheduled_at: 1 });

    res.json(visits);
} catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
}

};

exports.approveVisit = async (req, res) => {
    try {
        let visit = await Visit.findOne({ _id: req.params.id, host: req.user._id });
        if (!visit) return res.status(404).json({ message: 'Visit not found or not assigned to you.' });

        if(visit.status !== 'AWAITING_APPROVAL') {
            return res.status(400).json({ message: `Visit is already ${visit.status.toLowerCase()} and cannot be approved again.` });
        }

        visit.status = 'APPROVED';
        await visit.save();
        
        await AuditLog.create({
            actor: req.user._id,
            action: 'VISIT_APPROVED',
            details: `Host ${req.user.name} approved visit for ${visit.visitorName}.`,
            visit: visit._id
        });

        const securityUsers = await User.find({ company: req.user.company, role: 'security' });
        if (securityUsers.length > 0) {
            const message = `Host ${req.user.name} APPROVED a visit for ${visit.visitorName} at ${new Date(visit.scheduled_at).toLocaleTimeString()}.`;
            await Notification.create({
                sender: req.user._id,
                recipients: securityUsers.map(u => ({ user: u._id })),
                message: message,
                visit: visit._id,
                type: 'VISIT_APPROVED'
            });
        }

        // --- SEND THE VISITOR PASS EMAIL ---
        // Fetch the full visitor document to ensure we have the selfie data
        const visitor = await Visitor.findById(visit.visitor);
        if (visitor) {
            await sendVisitPass(visit.toObject(), visitor.toObject()); // Use .toObject() for clean data
        }
        // ------------------------------------

        res.json({ message: 'Visit approved successfully. Pass sent to visitor.', visit });
    } catch (error) {
        console.error("Error in approveVisit:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Host rejects a visit
exports.rejectVisit = async (req, res) => {
    const { reason } = req.body;
    try {
        const visit = await Visit.findOneAndUpdate(
            { _id: req.params.id, host: req.user._id },
            { status: 'REJECTED', rejectionReason: reason },
            { new: true }
        );
        if (!visit) return res.status(404).json({ message: 'Visit not found or not assigned to you.' });
        
        const securityUsers = await User.find({ company: req.user.company, role: 'security' });
        if (securityUsers.length > 0) {
            const message = `Host ${req.user.name} REJECTED a visit for ${visit.visitorName}. Reason: ${visit.rejectionReason}`;
            await Notification.create({
                sender: req.user._id,
                recipients: securityUsers.map(u => ({ user: u._id })),
                message: message,
                visit: visit._id,
                type: 'VISIT_REJECTED'
            });
        }

        await AuditLog.create({
            actor: req.user._id,
            action: 'VISIT_REJECTED',
            details: `Host ${req.user.name} rejected visit for ${visit.visitorName}. Reason: ${reason || 'Not specified'}.`,
            visit: visit._id
        });

        // Logic to send rejection email
        res.json({ message: 'Visit rejected.', visit });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Host schedules a new visit
// Host schedules a new visit
exports.scheduleVisit = async (req, res) => {
    try {
        const { name, email, phone, organization, purpose, scheduled_at } = req.body;
        if (!name || !email || !phone || !purpose || !scheduled_at) {
            return res.status(400).json({ message: "Please provide all visitor and visit details." });
        }
        
        const visitorData = { name, email, phone, organization };
        if (req.files && req.files.selfie) {
            const resizedSelfieBuffer = await sharp(req.files.selfie[0].buffer)
                .resize({ width: 150, height: 150, fit: 'cover' })
                .png()
                .toBuffer();

            visitorData.selfie = { data: resizedSelfieBuffer, contentType: 'image/png' };
        }
        if (req.files && req.files.aadhar) {
            visitorData.aadhar = { data: req.files.aadhar[0].buffer, contentType: req.files.aadhar[0].mimetype };
        }

        const visitor = await Visitor.findOneAndUpdate(
            { email },
            { $set: visitorData },
            { new: true, upsert: true, runValidators: true }
        );

        const newVisit = new Visit({
            purpose,
            scheduled_at,
            visitor: visitor._id,
            host: req.user._id,
            company: req.user.company,
            visitorName: visitor.name,
            hostName: req.user.name,
            status: 'SCHEDULED', 
            createdBy: req.user._id,
        });

        await newVisit.save();

        await AuditLog.create({
            actor: req.user._id,
            action: 'VISIT_SCHEDULED',
            details: `Host ${req.user.name} scheduled a visit for ${visitor.name}.`,
            visit: newVisit._id
        });

        // --- SEND THE VISITOR PASS EMAIL ---
        await sendVisitPass(newVisit.toObject(), visitor.toObject()); // Use .toObject() for clean data
        // ------------------------------------

        res.status(201).json({ message: "Visit scheduled successfully. Pass sent to visitor.", visit: newVisit });

    } catch (error) {
        console.error("Error in scheduleVisit:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// const Visit = require('../models/visit.model');

// ✅ Get only completed (checked out) visits for recent history
exports.getRecentVisits = async (req, res) => {
  try {
    // TEMPORARY: Replace with req.user._id when auth is implemented
    const hostId = req.user._id;

    // ✅ Only show visits that are completed or checked out
    const visits = await Visit.find({
      host: hostId,
      status: { $in: ["CHECKED_OUT", "COMPLETED"] },
    })
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate({
        path: "visitor",
        select: "name email phone organization selfie",
      })
      .populate({
        path: "company",
        select: "name address",
      })
      .lean();

    // If no completed visits found, return empty array
    if (!visits || visits.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(visits);
  } catch (error) {
    console.error("Error fetching completed visits:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};






exports.getAllVisits = async (req, res) => {
    try {
        // --- THIS IS THE CORRECTED LOGIC ---
        
        const query = {
            host: req.user._id,
            // Only include statuses that are relevant for an "upcoming" view
            status: { $in: ['AWAITING_APPROVAL', 'APPROVED', 'SCHEDULED', 'CHECKED_IN'] }
        };
        // ------------------------------------

        // Add date filtering based on query parameters
        if (req.query.startDate) {
            query.scheduled_at = { ...query.scheduled_at, $gte: new Date(req.query.startDate) };
        }
        if (req.query.endDate) {
            query.scheduled_at = { ...query.scheduled_at, $lte: new Date(req.query.endDate) };
        }

        const visits = await Visit.find(query)
            .sort({ scheduled_at: 1 })
            .populate('visitor', 'name selfie');

        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.notifySecurity = async (req, res) => {
    const { message, visitId } = req.body;
    if (!message || !visitId) {
        return res.status(400).json({ message: 'Message and visitId are required.' });
    }

    try {
        const visit = await Visit.findById(visitId);
        if (!visit || visit.host.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Visit not found or you are not authorized.' });
        }

        const securityUsers = await User.find({ company: req.user.company, role: 'security' });
        if (securityUsers.length === 0) {
            return res.status(404).json({ message: 'No security personnel found for this company.' });
        }

        // Create ONE notification document with multiple recipients
        await Notification.create({
            sender: req.user._id,
            recipients: securityUsers.map(u => ({ user: u._id })), // Map to the recipient schema
            message: `Host ${req.user.name} says: "${message}" (Regarding visitor: ${visit.visitorName})`,
            visit: visitId,
            type: 'HOST_ALERT'
        });

        await AuditLog.create({
            actor: req.user._id,
            action: 'HOST_NOTIFY_SECURITY',
            details: `Host ${req.user.name} notified security about visit for ${visit.visitorName}.`
        });

        res.status(200).json({ message: 'Security has been notified.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getMissedVisits = async (req, res) => {
    try {
        const visits = await Visit.find({ host: req.user._id, status: 'MISSED' }).populate('visitor', 'name selfie')
            .sort({ scheduled_at: -1 });
        res.json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.rescheduleVisit = async (req, res) => {
    const { scheduled_at } = req.body;
    if (!scheduled_at) {
        return res.status(400).json({ message: 'New date and time are required.' });
    }

    try {
        const visit = await Visit.findOneAndUpdate(
            { _id: req.params.id, host: req.user._id },
            { 
                scheduled_at: new Date(scheduled_at),
                status: 'SCHEDULED' // Change status from MISSED/etc. back to SCHEDULED
            },
            { new: true }
        ).populate('visitor');

        if (!visit) {
            return res.status(404).json({ message: 'Visit not found or you are not authorized.' });
        }

        // Re-send the visit pass with the updated details
        await sendVisitPass(visit.toObject(), visit.visitor.toObject());

        await AuditLog.create({
            actor: req.user._id,
            action: 'VISIT_RESCHEDULED',
            details: `Visit for ${visit.visitorName} rescheduled to ${visit.scheduled_at}.`
        });

        res.json({ message: 'Visit rescheduled and new pass sent.', visit });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get visit stats for this host
exports.getHostVisitStats = async (req, res) => {
    try {
        const hostId = req.user._id;

        // --- TODAY RANGE ---
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // --- TOMORROW START (NO END LIMIT) ---
        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);

        // COUNT: Expected tomorrow onwards (approved only)
        const expectedTomorrow = await Visit.countDocuments({
            host: hostId,
            status: "APPROVED",
            scheduled_at: { $gte: tomorrowStart }
        });

        // COUNT: Missed visits
        const missed = await Visit.countDocuments({
            host: hostId,
            status: "MISSED"
        });

        // COUNT: Awaiting Approval
        const awaitingApproval = await Visit.countDocuments({
            host: hostId,
            status: "AWAITING_APPROVAL"
        });

        // COUNT: Today's expected visitors (scheduled or approved)
        const todayExpected = await Visit.countDocuments({
            host: hostId,
            status: { $in: ["SCHEDULED", "APPROVED"] },
            scheduled_at: { $gte: todayStart, $lte: todayEnd }
        });

        res.status(200).json({
            expectedTomorrow,
            missed,
            awaitingApproval,
            todayExpected
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
