const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  name: String,
  apartment: String,
  date: String,
  time: String,
  creator: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
