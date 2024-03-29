import axios from "axios";

const url = "https://sum-omega.vercel.app/api/bookings";
export const fetchBookings = () => axios.get(url);
export const createBooking = (newBooking) => axios.post(url, newBooking);
export const deleteBooking = (id) => axios.delete(`${url}/${id}`);
export const updateBooking = (id, updatedBooking) =>
  axios.patch(`${url}/${id}`, updatedBooking);
