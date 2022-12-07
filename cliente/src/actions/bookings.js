import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api";

export const getBookings = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBookings();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createBooking = (booking) => async (dispatch) => {
  try {
    const { data } = await api.createBooking(booking);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  try {
    await api.deleteBooking(bookingId);
    dispatch({ type: DELETE, payload: bookingId });
  } catch (error) {
    console.log(error);
  }
};
