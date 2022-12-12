import React, { useState, useEffect } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "./styles.css";
import dayjs from "dayjs";
import {
  TextField,
  Paper,
  Button,
  MenuItem,
  Snackbar,
  AlertTitle,
  Card,
  Typography,
  Grow,
  Fab,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Stack } from "@mui/system";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createBooking, updateBooking } from "../../actions/bookings";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Auth from "../Auth/Auth";
const styles = {
  input: {},
};
const Form = ({ setCurrentId, currentId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings, shallowEqual);
  const booking = useSelector((state) =>
    currentId
      ? state.bookings.find((booking) => booking._id === currentId)
      : null
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [value, setValue] = React.useState(dayjs().format("DD/MM/YYYY"));
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });
  const [bookingData, setBookingData] = useState({
    apartment: "",
    date: value,
    time: "",
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    if (booking) setBookingData(booking);
  }, [booking, currentId]);

  const handleChange = (newValue) => {
    setValue(newValue);
    setBookingData({ ...bookingData, date: newValue.format("DD/MM/YYYY") });
  };

  const existBooking = (newDate, time) => {
    return bookings.some(
      (booking) => booking.date === newDate && booking.time === time
    );
  };
  const clearForm = () => {
    setCurrentId(null);
    setBookingData({
      name: "",
      apartment: "",
      date: value?.format("DD/MM/YYYY"),
      time: "",
    });
  };

  const handleClose = () => {
    setSnackBar({ name: false, message: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookingData);
    if (
      bookingData.apartment.trim() === "" ||
      bookingData.date.trim() === "" ||
      bookingData.time.trim() === ""
    ) {
      setSnackBar({
        open: true,
        message: "Estas intentando cargar una reserva vacia",
        severity: "error",
      });
      return;
    }
    if (currentId && !existBooking(bookingData.date, bookingData.time)) {
      dispatch(
        updateBooking(currentId, {
          ...bookingData,
          creator: user?.data.sub,
          name: user?.data.name,
        })
      );
    } else if (!existBooking(bookingData.date, bookingData.time)) {
      dispatch(
        createBooking({
          ...bookingData,
          creator: user?.data.sub,
          name: user?.data.name,
        })
      );
    } else {
      setSnackBar({
        open: true,
        message: "Ese dia ya se encuentra reservado en el turno que elegiste",
        severity: "error",
      });
    }
    clearForm();
  };

  if (!user?.data?.name) {
    return <Auth />;
  }
  return (
    <>
      <Paper style={{ padding: "10px 20px" }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h3>{currentId ? "Edita tu reserva" : "Crea una nueva Reserva"}</h3>
          <Stack direction="column" spacing={2}>
            <TextField
              name="apartment"
              inputProps={{
                className: "Input",
                pattern: "[0-9]{1,2}[a-zA-Z]",
              }}
              variant="outlined"
              label="Departamento"
              fullWidth
              value={bookingData.apartment}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  apartment: e.target.value.toUpperCase(),
                })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                disablePast
                label="Fecha de reserva"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              value={bookingData.time}
              select
              label="Turno"
              onChange={(e) =>
                setBookingData({ ...bookingData, time: e.target.value })
              }
            >
              <MenuItem value="Dia">Dia</MenuItem>
              <MenuItem value="Noche">Noche</MenuItem>
            </TextField>
          </Stack>
          <Stack direction="row" paddingY={2} spacing={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              {currentId ? "Editar" : "Reservar"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              fullWidth
              onClick={clearForm}
            >
              Limpiar
            </Button>
          </Stack>
          <Snackbar
            open={snackBar.open}
            onClose={handleClose}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Alert severity={snackBar.severity}>{snackBar.message}</Alert>
          </Snackbar>
        </form>
      </Paper>
    </>
  );
};
export default Form;
