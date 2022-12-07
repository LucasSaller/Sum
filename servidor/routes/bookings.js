import express from "express";
import {
  getBookings,
  createBooking,
  deleteBooking,
} from "../controllers/booking.js";
const router = express.Router();

router.get("/", getBookings);
router.post("/", createBooking);
router.delete("/:id", deleteBooking);

export default router;
