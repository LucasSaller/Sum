import { combineReducers } from "redux";

import bookings from "./bookings";
import authReducer from "./auth";
export default combineReducers({
  bookings,
  authReducer,
});
