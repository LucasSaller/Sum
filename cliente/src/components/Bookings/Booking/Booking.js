import React from "react";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const Booking = ({ booking }) => {
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
