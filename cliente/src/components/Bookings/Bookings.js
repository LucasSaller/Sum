import React, { useEffect } from "react";
import Booking from "./Booking/Booking";
import { shallowEqual, useSelector } from "react-redux";
import {
  Card,
  CircularProgress,
  Grid,
  Grow,
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

  const makeDate = (str) => {
    const [_, dd, mm, yyyy] = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return new Date(yyyy, mm - 1, dd);
  };
  const sortedBookings = bookings.sort(
    (a, b) => makeDate(a.date) - makeDate(b.date)
  );
  const MobileBookings = ({ booking }) => {
    return !bookings.length ? (
      <>
        <p>Buscando reservas..</p>
        <CircularProgress />
      </>
    ) : (
      <Grid container>
        <Grid item xs={4}>
          <Card>
            <p>{booking.name}</p>
            <p>{booking.apartment}</p>
            <p>{booking.date}</p>
            <p>{booking.time}</p>
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
          </Card>
        </Grid>
      </Grid>
    );
  };

  return !bookings.length ? (
    <>
      <p>Buscando reservas..</p>
      <CircularProgress />
    </>
  ) : (
    <>
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
          {sortedBookings.map((booking, id) =>
            matches ? (
              <MobileBookings key={id} booking={booking} />
            ) : (
              <TableBody key={id}>
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {booking.name}
                  </TableCell>
                  <TableCell align="left">{booking.apartment}</TableCell>
                  <TableCell align="left">{booking.date}</TableCell>
                  <TableCell align="left">{booking.time}</TableCell>
                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Bookings;
