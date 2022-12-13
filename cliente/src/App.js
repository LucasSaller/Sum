import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const backgroundDark = "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)";
  const backgroundDark2 =
    "linear-gradient(180deg, rgba(69,80,94,1) 0%, rgba(52,68,89,1) 62%)";
  //  " linear-gradient(180deg, rgba(121,130,145,0.9864320728291317) 0%, rgba(31,29,54,1) 100%)";
  const backgroundLight = "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)";

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      type: "light",
      ...(darkMode
        ? {
            primary: {
              light: "#7982f1",
              main: "#4356be",
              dark: "#2B3A55",
              contrastText: "#fff",
            },
            secondary: {
              light: "#ff77a9",
              main: "#ec407a",
              dark: "#9c64a6",
              contrastText: "#fff",
            },
            nav: {
              main: "#2B3A55",
            },
            background: {
              default: "#FFF",
            },
            login: {
              main: "#465488",
              dark: "#162c5b",
              light: "#7580b8",
            },
            headers: {
              main: "#c0c0c0",
            },
          }
        : {
            primary: {
              light: "#7982f1",
              main: "#4356be",
              dark: "#2B3A55",
              contrastText: "#fff",
            },
            secondary: {
              light: "#ff77a9",
              main: "#ec407a",
              dark: "#9c64a6",
              contrastText: "#fff",
            },
            nav: {
              main: "#566482",
            },
            login: {
              main: "#fff",
              dark: "#cccccc",
              light: "#fff",
            },
            headers: {
              main: "#000",
            },
          }),

      // primary: {
      //   main: "#6d70f8",
      //   light: "#9092ec",
      //   dark: "#5559f9",
      // },
      // secondary: {
      //   main: "#bac8e0",
      //   light: "#8bcdf7",
      //   dark: "#1776af",
      //   contrastText: "#fff",
      // },
      error: {
        main: "#D61C4E",
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

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <GoogleOAuthProvider clientId="329361314054-k518ne5s1qh23v3m9jt1ao25o38tu0kh.apps.googleusercontent.com">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box
            style={{
              minHeight: "100vh",
              backgroundImage: `${
                darkMode ? backgroundDark2 : backgroundLight
              }`,
            }}
          >
            <NavBar handleDarkMode={handleDarkMode} darkMode={darkMode} />
            <Routes>
              <Route path="/" exact element={<Home />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
export default App;
