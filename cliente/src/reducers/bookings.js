import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

export default (bookings = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...bookings, action.payload];
    case UPDATE:
      return bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
      );
    case DELETE:
      return bookings.filter((booking) => booking._id !== action.payload);

    default:
      return bookings;
  }
};
