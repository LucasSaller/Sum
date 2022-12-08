import { Paper, Typography, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../../actions/bookings";
import EditIcon from "@mui/icons-material/Edit";
const Booking = ({ booking, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <Paper>
      <IconButton aria-label="edit" onClick={() => setCurrentId(booking._id)}>
        <EditIcon />
      </IconButton>
      <Stack direction="row" spacing={3} padding={3}>
        <Typography>{booking.name}</Typography>
        <Typography>{booking.apartment}</Typography>
        <Typography>{booking.date}</Typography>
        <Typography>{booking.time}</Typography>
      </Stack>
      <IconButton
        aria-label="delete"
        color="error"
        onClick={() => dispatch(deleteBooking(booking._id))}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default Booking;
