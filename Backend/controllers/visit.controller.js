const Visit = require("../models/visit.model");
const Visitor = require("../models/visitor.model");

// ---------------------- VALIDATE PASS (QR + manual) ----------------------
exports.validateVisit = async (req, res) => {
  try {
    const { pass } = req.body;  // scanned QR or manual code

    const visit = await Visit.findOne({ pass_code: pass })
      .populate("visitor")
      .populate("host")
      .populate("company");

    // Pass not found
    if (!visit) {
      return res.status(404).json({
        message: "Invalid pass, or visit is not approved/scheduled for your company."
      });
    }

    // Visit must be approved
    if (visit.status !== "APPROVED" && visit.status !== "SCHEDULED") {
      return res.status(400).json({
        message: "Visit is not approved or already processed."
      });
    }

    // Visit must be scheduled for today
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
        message: "Visitor has already checked in."
      });
    }

    return res.json({
      success: true,
      visit
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ---------------------- CHECK-IN VISITOR ----------------------
exports.checkIn = async (req, res) => {
  try {
    const { id } = req.body;

    const visit = await Visit.findById(id);

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    if (visit.status === "CHECKED_IN") {
      return res.json({ message: "Visitor already checked-in" });
    }

    visit.status = "CHECKED_IN";
    visit.checkin_time = new Date();
    await visit.save();

    return res.json({ message: "Visitor checked-in successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- GET EXPECTED VISITS ----------------------
exports.expected = async (req, res) => {
  try {
    const today = new Date().toDateString();
    const visits = await Visit.find({
      status: { $in: ["APPROVED", "SCHEDULED"] }
    }).populate("visitor");

    res.json(visits.filter(v =>
      new Date(v.scheduled_at).toDateString() === today
    ));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- GET CHECKED-IN VISITS ----------------------
exports.checkedIn = async (req, res) => {
  try {
    const visits = await Visit.find({ status: "CHECKED_IN" })
      .populate("visitor");

    res.json(visits);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- GET CHECKED-OUT TODAY ----------------------
exports.checkedOutToday = async (req, res) => {
  try {
    const today = new Date().toDateString();

    const visits = await Visit.find({
      status: "CHECKED_OUT"
    }).populate("visitor");

    res.json(visits.filter(v =>
      new Date(v.checkout_time).toDateString() === today
    ));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
