const express = require("express");
const { validateQR, validateCode, checkInVisitor } = require("../controllers/scanController");

const router = express.Router();

router.post("/validate-qr", validateQR);
router.post("/validate-code", validateCode);
router.post("/check-in", checkInVisitor);

module.exports = router;
