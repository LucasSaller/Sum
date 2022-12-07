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
      console.log("estoy haciendo el fetch");
      return action.payload;
    case CREATE: {
      return [...bookings, action.payload];
    }
    default:
      return bookings;
  }
};
