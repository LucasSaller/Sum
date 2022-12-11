import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Grow,
  Grid,
  AppBar,
  Box,
  IconButton,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { getBookings } from "./actions/bookings";
import Bookings from "./components/Bookings/Bookings";
import Form from "./components/Form/Form";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      type: "light",
      primary: {
        main: "#6d70f8",
        light: "#9092ec",
        dark: "#5559f9",
      },
      secondary: {
        main: "#54c0fb",
        light: "#8bcdf7",
        dark: "#1776af",
      },
      error: {
        main: "#fa6d81",
        light: "#fb96a6",
        dark: "#f73f5a",
      },
      warning: {
        main: "#ffb74d",
        light: "#f1c187",
        dark: "#ffa51c",
      },
    },
  });

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ minHeight: "100vh" }}>
        <NavBar handleDarkMode={handleDarkMode} darkMode={darkMode} />
        <Grow in>
          <Container style={{ marginTop: "24px" }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={8}>
                <Bookings setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Box>
    </ThemeProvider>
  );
};
export default App;
