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
    <Stack
      direction="row"
      spacing={6}
      paddingY={1}
      paddingX={2}
      alignItems="center"
      position="relative"
    >
      <Typography>{booking.name}</Typography>
      <Typography>{booking.apartment}</Typography>
      <Typography>{booking.date}</Typography>
      <Typography>{booking.time}</Typography>
      <Stack position="absolute" direction="row" right="0">
        <IconButton aria-label="edit" onClick={() => setCurrentId(booking._id)}>
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => dispatch(deleteBooking(booking._id))}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Booking;
