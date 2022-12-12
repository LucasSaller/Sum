import React, { useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const backgroundDark = "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)";
  const backgroundDark2 =
    "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)";
  const backgroundLight = "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)";

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      type: "light",
      primary: {
        light: "#d1d9ff",
        main: "#9fa8da",
        dark: "#6f79a8",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff77a9",
        main: "#ec407a",
        dark: "#9c64a6",
        contrastText: "#000",
      },
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
              <Route path="/auth" exact element={<Auth />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
export default App;
