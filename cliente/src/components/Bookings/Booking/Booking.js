import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../../actions/bookings";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Booking = ({ booking, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow
            key={booking.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {booking.name}
            </TableCell>
            <TableCell align="right">{booking.apartment}</TableCell>
            <TableCell align="right">{booking.date}</TableCell>
            <TableCell align="right">{booking.time}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Booking;
