const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/booking.js");

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  const { apartment, date, time, creator, name } = req.body;
  console.log(req.body);
  const newBooking = new Booking({ apartment, date, time, creator, name });
  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { apartment, date, time, name, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No booking with id: ${id}`);

  const updatedBooking = { apartment, date, time, _id: id, name, creator };

  await Booking.findByIdAndUpdate(id, updatedBooking, { new: true });

  res.json(updatedBooking);
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No booking with id: ${id}`);

  await Booking.findByIdAndRemove(id);

  res.json({ message: "Booking deleted successfully." });
};
