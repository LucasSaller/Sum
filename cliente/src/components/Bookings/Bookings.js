import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { CircularProgress, Box, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import MobileBookings from "./Booking/MobileBooking";
import DesktopBookings from "./Booking/DesktopBookings";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Styles.css";

const Bookings = ({ setCurrentId }) => {
  const location = useLocation();
  const matches = useMediaQuery("(max-width:600px)");
  const bookings = useSelector((state) => state.bookings, shallowEqual);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [tab, setTab] = useState("1");

  const makeDate = (str) => {
    const [_, dd, mm, yyyy] = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return new Date(yyyy, mm - 1, dd);
  };

  const sortedBookings = bookings.sort((a, b) => {
    const date1 = +makeDate(a.date);
    const date2 = +makeDate(b.date);
    return date1 === date2 ? (a.time === "Noche" ? 1 : -1) : date1 - date2;
  });
  const pastBookings = sortedBookings.filter(
    (booking) =>
      dayjs(makeDate(booking.date)).diff(dayjs().subtract(1, "day")) < 0
  );
  const upComingBookings = sortedBookings.filter(
    (booking) =>
      dayjs(makeDate(booking.date)).diff(dayjs().subtract(1, "day")) > 0
  );

  useEffect(() => {}, [location]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return !bookings.length ? (
    <>
      <Stack spacing={3}>
        <h4>Buscando reservas..</h4>
        <CircularProgress />
      </Stack>
    </>
  ) : (
    <>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="reservas">
            <Tab label="Reservas" value="1" style={{ fontSize: "18px" }} />
            <Tab
              label="Reservas pasadas"
              value="2"
              style={{ fontSize: "18px" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" style={{ padding: 0, marginTop: 16 }}>
          {matches ? (
            <Stack spacing={2}>
              <MobileBookings
                bookings={upComingBookings}
                user={user}
                setCurrentId={setCurrentId}
              />
            </Stack>
          ) : (
            <DesktopBookings
              bookings={upComingBookings}
              setCurrentId={setCurrentId}
            />
          )}
        </TabPanel>
        <TabPanel value="2" style={{ padding: 0, marginTop: 16 }}>
          {matches ? (
            <Stack spacing={2}>
              <MobileBookings
                bookings={pastBookings}
                user={user}
                past
                setCurrentId={setCurrentId}
              />
            </Stack>
          ) : (
            <DesktopBookings
              bookings={pastBookings}
              setCurrentId={setCurrentId}
              past
            />
          )}
        </TabPanel>
      </TabContext>
    </>
  );
};

export default Bookings;
