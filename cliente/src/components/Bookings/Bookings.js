import React from "react";
import Booking from "./Booking/Booking";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);
  console.log(bookings);
  return !bookings.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}></Grid>
  );
};

export default Bookings;
