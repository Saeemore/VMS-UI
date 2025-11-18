const Visitor = require("../models/visitor.model");

// -------------------- Validate QR Scan --------------------
exports.validateQR = async (req, res) => {
  try {
    const { qrData } = req.body;

    const visitor = await Visitor.findOne({ qrString: qrData });

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "QR not found"
      });
    }

    if (visitor.status === "checked-in") {
      return res.status(400).json({
        success: false,
        message: "Already checked in"
      });
    }

    return res.json({
      success: true,
      visitor
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------- Validate Manual 6-Digit Code --------------------
exports.validateCode = async (req, res) => {
  try {
    const { code } = req.body;

    const visitor = await Visitor.findOne({ manualCode: code });

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Invalid manual code"
      });
    }

    if (visitor.status === "checked-in") {
      return res.status(400).json({
        success: false,
        message: "Already checked in"
      });
    }

    return res.json({
      success: true,
      visitor
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// -------------------- Mark Visitor as Checked-In --------------------
exports.checkInVisitor = async (req, res) => {
  try {
    const { id } = req.body;

    const visitor = await Visitor.findById(id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    visitor.status = "checked-in";
    await visitor.save();

    return res.json({ success: true, message: "Visitor checked in" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
