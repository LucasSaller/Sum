const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  apartment: String,
  date: String,
  time: String,
  creator: String,
  name: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
