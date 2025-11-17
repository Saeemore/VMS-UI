
// node// FILE: server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
// Import Routes
const authRoutes = require('./routes/auth.routes');
const publicRoutes = require('./routes/public.routes');
const hostRoutes = require('./routes/host.routes');
const securityRoutes = require('./routes/security.routes');
const adminRoutes = require('./routes/admin.routes');
const notificationRoutes = require('./routes/notification.routes');
const visitorRoutes = require('./routes/visitor.routes');
const adminStatRoutes=require('./routes/adminStats.routes')
const flagMissedVisits = require('./jobs/missedVisits.job');
const scanRoutes = require('./routes/scan.routes');
const visitRoutes = require('./routes/visit.routes');
const app = express();

// Middleware
app.use(cors({
  origin: '*', // or specify your frontend origin like 'http://localhost:3000'
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE',"OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if you use cookies/auth headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/host', hostRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/stats',adminStatRoutes );
app.use('/api/visitors', visitorRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/visits', visitRoutes);

app.get('/', (req, res) => res.send('Visitor Management System API is live!'));

// Basic Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    // Start the scheduled jobs once the server is running
    flagMissedVisits(); // <-- 2. START THE JOB
});