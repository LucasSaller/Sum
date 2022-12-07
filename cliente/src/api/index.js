import axios from "axios";

const url = "http://localhost:5000/bookings";

export const fetchBookings = () => axios.get(url);
export const createBooking = (newBooking) => axios.post(url, newBooking);
export const deleteBooking = (bookingId) => axios.delete(`{url}/${bookingId}`);
