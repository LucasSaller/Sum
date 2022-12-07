import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  name: String,
  apartment: String,
  date: String,
  time: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
