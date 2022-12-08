import React, { useState, useEffect } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { TextField, Paper, Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/system";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createBooking, updateBooking } from "../../actions/bookings";

const Form = ({ setCurrentId, currentId }) => {
  const [value, setValue] = React.useState(dayjs());
  const [bookingData, setBookingData] = useState({
    name: "",
    apartment: "",
    date: value,
    time: "",
  });
  const bookings = useSelector((state) => state.bookings, shallowEqual);
  const booking = useSelector((state) =>
    currentId
      ? state.bookings.find((booking) => booking._id === currentId)
      : null
  );
  const dispatch = useDispatch();
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
    if (currentId) {
      dispatch(updateBooking(currentId, bookingData));
    } else if (!existBooking(bookingData.date, bookingData.time)) {
      dispatch(createBooking(bookingData));
    } else {
      console.log("Ya esta reservado ese dia"); //TOAST
    }
    clearForm();
  };

  const clearForm = () => {
    setCurrentId(null);
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
          <h3>{currentId ? "Edita tu reserva" : "Crea una nueva Reserva"}</h3>
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
              <MenuItem value="dia">Dia</MenuItem>
              <MenuItem value="noche">Noche</MenuItem>
            </TextField>
          </Stack>
          <Stack direction="row" padding={2} spacing={2}>
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
