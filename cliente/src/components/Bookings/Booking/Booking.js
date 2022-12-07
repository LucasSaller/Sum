import { Paper, Typography, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Booking = ({ booking }) => {
  return (
    <Paper>
      <Stack direction="row" spacing={3} padding={3}>
        <Typography>{booking.name}</Typography>
        <Typography>{booking.apartment}</Typography>
        <Typography>{booking.date}</Typography>
        <Typography>{booking.time}</Typography>
      </Stack>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default Booking;
