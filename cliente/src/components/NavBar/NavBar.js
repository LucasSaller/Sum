import React from "react";
import logo from "../../assets/logo.png";
import {
  Container,
  Stack,
  Grow,
  Grid,
  AppBar,
  Box,
  IconButton,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const NavBar = ({ handleDarkMode, darkMode }) => {
  return (
    <AppBar position="static" color="primary" style={{ padding: 6 }}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <img
          style={{
            margin: "0 auto",
          }}
          src={logo}
          width="100px"
          height="30px"
          alt="logo"
        />

        <IconButton onClick={handleDarkMode}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon color="warning" />}
        </IconButton>
      </Stack>
    </AppBar>
  );
};

export default NavBar;
