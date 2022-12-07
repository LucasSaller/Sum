import React from "react";
import Booking from "./Booking/Booking";
import { useSelector } from "react-redux";
import { Card, CircularProgress, Grid } from "@mui/material";
const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);
  return !bookings.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {bookings.map((booking, id) => {
        return (
          <Card key={id}>
            <p>{booking.date}</p>
          </Card>
        );
      })}
    </Grid>
  );
};

export default Bookings;
