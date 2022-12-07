import express from "express";
import mongoose from "mongoose";

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
  const { name, apartment, date, time } = req.body;
  const newBooking = new Booking({ name, apartment, date, time });
  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No booking with id: ${id}`);

  await Booking.findByIdAndRemove(id);

  res.json({ message: "Booking deleted successfully." });
};
