import Booking from "../models/booking.js";

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createBooking = async (req, res) => {
  const booking = req.body;
  console.log(booking);
  const newBooking = new Booking(booking);
  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
