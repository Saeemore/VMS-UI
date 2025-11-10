// FILE: routes/visitor.routes.js
const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitor.model");
const Visit = require("../models/visit.model");

// ✅ 1. Route: Get all visitors (for Manage Visitors page)
router.get("/", async (req, res) => {
  try {
    // Populate related data like host (who they're visiting)
    const visits = await Visit.find()
      .populate("visitor", "name email phone")
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    res.json(visits);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching visitors",
      error: error.message,
    });
  }
});

// ✅ Route to serve a visitor's selfie image
router.get("/:id/selfie", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor || !visitor.selfie || !visitor.selfie.data) {
      return res.status(404).send("No selfie found");
    }

    res.set("Content-Type", visitor.selfie.contentType);
    res.send(visitor.selfie.data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
