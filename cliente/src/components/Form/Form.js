import React, { useState, useEffect } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { TextField, Paper, Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/system";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createBooking, getBookings } from "../../actions/bookings";

const Form = () => {
  const [value, setValue] = React.useState(dayjs().format("DD/MM/YYYY"));
  const [bookingData, setBookingData] = useState({
    name: "",
    apartment: "",
    date: value,
    time: "",
  });

  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings, shallowEqual);

  const handleChange = (newValue) => {
    setValue(newValue);
    setBookingData({ ...bookingData, date: newValue.format("DD/MM/YYYY") });
  };

  const addBooking = (booking) => {
    dispatch(createBooking(booking));
  };
  const existBooking = (newDate, time) => {
    const listaBookings = bookings;
    // console.log(listaBookings);
    // const resultado = listaBookings.some((booking) => booking.date === newDate);
    // console.log(resultado);
    return bookings.some(
      (booking) => booking.date === newDate && booking.time === time
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      bookingData.name.trim() === "" ||
      bookingData.apartment.trim() === "" ||
      bookingData.date.trim() === "" ||
      bookingData.time.trim() === ""
    ) {
      alert("Estas intentando cargar una reserva vacia flaco");
      return;
    }
    if (!existBooking(bookingData.date, bookingData.time)) {
      addBooking(bookingData);
      clearForm();
    } else {
      console.log("Ya esta reservado ese dia"); //TOAST
    }
  };

  const clearForm = () => {
    setBookingData({
      name: "",
      apartment: "",
      date: "",
      time: "",
    });
  };

  return (
    <>
      <Paper style={{ padding: "10px 20px" }}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <h3>Anotate con este formulario</h3>
          <Stack direction="column" spacing={2}>
            <TextField
              name="name"
              variant="outlined"
              label="Nombre"
              fullWidth
              value={bookingData.name}
              onChange={(e) =>
                setBookingData({ ...bookingData, name: e.target.value })
              }
            />
            <TextField
              name="apartment"
              variant="outlined"
              label="Apartamento"
              fullWidth
              value={bookingData.apartment}
              onChange={(e) =>
                setBookingData({ ...bookingData, apartment: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de reserva"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Select
              value={bookingData.time}
              label="Time"
              onChange={(e) =>
                setBookingData({ ...bookingData, time: e.target.value })
              }
            >
              <MenuItem value="dia">Dia</MenuItem>
              <MenuItem value="noche">Noche</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" padding={2} spacing={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Reservar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              onClick={clearForm}
            >
              Limpiar
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
};
export default Form;
