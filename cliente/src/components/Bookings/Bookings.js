import React, { useEffect } from "react";
import Booking from "./Booking/Booking";
import { shallowEqual, useSelector } from "react-redux";
import { Card, CircularProgress, Grid, Grow } from "@mui/material";
const Bookings = ({ setCurrentId }) => {
  const bookings = useSelector((state) => state.bookings, shallowEqual);
  return !bookings.length ? (
    <>
      <p>Buscando reservas..</p>
      <CircularProgress />
    </>
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {bookings.map((booking, id) => {
        return (
          <Grow in key={id}>
            <Grid item xs={12} sm={6}>
              <Booking booking={booking} setCurrentId={setCurrentId} />
            </Grid>
          </Grow>
        );
      })}
    </Grid>
  );
};

export default Bookings;
