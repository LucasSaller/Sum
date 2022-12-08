import React, { useEffect } from "react";
import Booking from "./Booking/Booking";
import { shallowEqual, useSelector } from "react-redux";
import {
  Card,
  CircularProgress,
  Grid,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
const Bookings = ({ setCurrentId }) => {
  const bookings = useSelector((state) => state.bookings, shallowEqual);
  return !bookings.length ? (
    <>
      <p>Buscando reservas..</p>
      <CircularProgress />
    </>
  ) : (
    <Paper style={{ padding: 20 }}>
      <Grid alignItems="stretch" spacing={3}>
        <Stack direction="row" spacing={3} paddingY={1} paddingX={1}>
          <Typography>Nombre</Typography>
          <Typography>Piso</Typography>
          <Typography>Dia</Typography>
          <Typography>Turno</Typography>
        </Stack>
        {bookings.map((booking, id) => {
          return (
            <Grow in key={id}>
              <Grid item xs={12}>
                <Booking booking={booking} setCurrentId={setCurrentId} />
              </Grid>
            </Grow>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default Bookings;
