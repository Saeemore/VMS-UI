// FILE: jobs/missedVisits.job.js

const cron = require('node-cron');
const Visit = require('../models/visit.model');

const flagMissedVisits = () => {
    // This cron job will run every day at 1:00 AM server time
    // It checks for any visits from previous days that were approved but never checked-in.
    cron.schedule('0 1 * * *', async () => {
        console.log('Running scheduled job: Flagging missed visits...');
        
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Get the very beginning of today

        try {
            const result = await Visit.updateMany(
                {
                    // Find visits that were approved/scheduled for any time BEFORE today
                    status: { $in: ['APPROVED', 'SCHEDULED'] },
                    scheduled_at: { $lt: today } 
                },
                { 
                    // Set their status to MISSED
                    $set: { status: 'MISSED' } 
                }
            );

            if (result.modifiedCount > 0) {
                console.log(`Successfully flagged ${result.modifiedCount} visits as MISSED.`);
            } else {
                console.log('No missed visits to flag today.');
            }
        } catch (error) {
            console.error('Error while flagging missed visits:', error);
        }
    });
};

module.exports = flagMissedVisits;