const express = require("express");
const {
  validateVisit,
  checkIn,
  expected,
  checkedIn,
  checkedOutToday
} = require("../controllers/visit.controller");

const router = express.Router();

router.post("/validate", validateVisit);        // QR + manual input
router.post("/check-in", checkIn);              // Check-in
router.get("/expected", expected);
router.get("/checked-in", checkedIn);
router.get("/checked-out-today", checkedOutToday);

module.exports = router;
