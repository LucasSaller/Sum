import React, { useEffect } from "react";
import Booking from "./Booking/Booking";
import { shallowEqual, useSelector } from "react-redux";
import {
  Card,
  CircularProgress,
  Box,
  Stack,
  Paper,
  IconButton,
  CardActions,
  Typography,
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
  const sortedBookings = bookings.sort((a, b) => {
    const date1 = +makeDate(a.date);
    const date2 = +makeDate(b.date);
    return date1 === date2 ? (a.time === "Noche" ? 1 : -1) : date1 - date2;
  });
  const MobileBookings = ({ booking }) => {
    return (
      <Paper>
        <Stack
          direction="row"
          spacing={3}
          paddingX={2}
          alignItems="center"
          justifyContent="left"
        >
          <h5>{booking.name}</h5>
          <h5>{booking.apartment}</h5>
          <h5>{booking.date}</h5>
          <h5>{booking.time}</h5>
          {user?.data.sub === booking.creator && (
            <CardActions disableSpacing>
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
              <TableCell align="center">Departamento</TableCell>
              <TableCell align="center">Dia&nbsp;</TableCell>
              <TableCell align="center">Turno&nbsp;</TableCell>
              <TableCell align="right">Acciones&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBookings.map((booking, id) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {booking.name}
                </TableCell>
                <TableCell align="center">{booking.apartment}</TableCell>
                <TableCell align="center">{booking.date}</TableCell>
                <TableCell align="center">{booking.time}</TableCell>
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
      <h4>Buscando reservas..</h4>
      <CircularProgress />
    </>
  ) : (
    <>
      <Stack direction="column" spacing={2}>
        {matches && (
          <Box display="flex" gap={4}>
            <Typography variant="p">Nombre</Typography>
            <Typography variant="p">Depto</Typography>
            <Typography variant="p">Dia</Typography>
            <Typography variant="p">Turno</Typography>
            <Typography variant="p">Acciones</Typography>
          </Box>
        )}
        {matches ? (
          sortedBookings.map((booking, id) => (
            <MobileBookings key={id} booking={booking} />
          ))
        ) : (
          <DesktopBookings />
        )}
      </Stack>
    </>
  );
};

export default Bookings;
