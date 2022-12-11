const express = require("express");
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking.js");
const router = express.Router();

router.get("/", getBookings);
router.post("/", createBooking);
router.patch("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
