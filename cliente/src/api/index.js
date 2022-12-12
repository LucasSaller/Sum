import axios from "axios";

const url = "http://localhost:5000/api/bookings";

export const fetchBookings = () => axios.get(url);
export const createBooking = (newBooking) => axios.post(url, newBooking);
export const deleteBooking = (id) => axios.delete(`${url}/${id}`);
export const updateBooking = (id, updatedBooking) =>
  axios.patch(`${url}/${id}`, updatedBooking);
