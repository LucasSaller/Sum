import React, { useEffect } from "react";
import Booking from "./Booking/Booking";
import { shallowEqual, useSelector } from "react-redux";
import {
  Card,
  CircularProgress,
  Grid,
  Grow,
  Stack,
  Paper,
  IconButton,
  CardActions,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../actions/bookings";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const Bookings = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:600px)");
  const bookings = useSelector((state) => state.bookings, shallowEqual);
  const user = JSON.parse(localStorage.getItem("profile"));

  const makeDate = (str) => {
    const [_, dd, mm, yyyy] = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return new Date(yyyy, mm - 1, dd);
  };
  const sortedBookings = bookings.sort(
    (a, b) => makeDate(a.date) - makeDate(b.date)
  );
  const MobileBookings = ({ booking }) => {
    return (
      <Paper borderRadius="0">
        <Stack
          direction="row"
          spacing={2}
          padding={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <p>{booking.name}</p>
          <p>{booking.apartment}</p>
          <p>{booking.date}</p>
          <p>{booking.time}</p>
          {user?.data.sub === booking.creator && (
            <CardActions disableSpacing>
              <IconButton
                size="small"
                aria-label="edit"
                onClick={() => setCurrentId(booking._id)}
              >
                <EditTwoToneIcon />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete"
                color="error"
                onClick={() => dispatch(deleteBooking(booking._id))}
              >
                <DeleteForeverTwoToneIcon />
              </IconButton>
            </CardActions>
          )}
        </Stack>
      </Paper>
    );
  };

  const DesktopBookings = () => {
    return (
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, fontWeight: "bold" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="left">Departamento</TableCell>
              <TableCell align="left">Dia&nbsp;</TableCell>
              <TableCell align="left">Turno&nbsp;</TableCell>
              <TableCell align="left">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBookings.map((booking, id) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {booking.name}
                </TableCell>
                <TableCell align="left">{booking.apartment}</TableCell>
                <TableCell align="left">{booking.date}</TableCell>
                <TableCell align="left">{booking.time}</TableCell>
                <TableCell align="right">
                  {user?.data.sub === booking.creator && (
                    <>
                      <IconButton
                        size="small"
                        aria-label="edit"
                        color="warning"
                        onClick={() => setCurrentId(booking._id)}
                      >
                        <EditTwoToneIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="delete"
                        color="error"
                        onClick={() => dispatch(deleteBooking(booking._id))}
                      >
                        <DeleteForeverTwoToneIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return !bookings.length ? (
    <>
      <p>Buscando reservas..</p>
      <CircularProgress />
    </>
  ) : (
    <>
      <h2>Reservas</h2>
      {matches ? (
        sortedBookings.map((booking, id) => (
          <MobileBookings key={id} booking={booking} />
        ))
      ) : (
        <DesktopBookings />
      )}
    </>
  );
};

export default Bookings;
