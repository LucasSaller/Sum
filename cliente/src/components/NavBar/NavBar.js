import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import {
  Stack,
  AppBar,
  IconButton,
  Toolbar,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
const NavBar = ({ handleDarkMode, darkMode }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar
      position="static"
      color="nav"
      style={{ padding: 6 }}
      enableColorOnDark
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton onClick={handleDarkMode}>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon color="warning" />}
        </IconButton>
        <Link to="/">
          <img
            style={{
              margin: "0 auto",
            }}
            src={logo}
            width="100px"
            height="30px"
            alt="logo"
          />
        </Link>
        <Toolbar>
          {user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt={user.data.name} src={user.data.picture} />
              <IconButton onClick={logout} color="error">
                <LogoutIcon />
              </IconButton>
            </Stack>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="login"
            >
              Iniciar Sesion
            </Button>
          )}
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default NavBar;
