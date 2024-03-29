import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import {
  Stack,
  AppBar,
  IconButton,
  Toolbar,
  Avatar,
  Button,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavBar = ({ handleDarkMode, darkMode }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMediaQuery("(max-width:600px)");

  const googleSucces = async (res) => {
    const token = res.credential;
    const decoded = jwt_decode(res.credential);
    const { name, picture, sub } = decoded;
    const data = {
      name,
      picture,
      sub,
    };
    try {
      dispatch({ type: "AUTH", data: { data, token } });
      navigate("/");
    } catch (error) {}
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const GoogleButton = () => {
    return matches ? (
      <GoogleLogin
        className="button-google"
        logo_alignment="center"
        size="small"
        text="ALU GOMEZ"
        shape="square"
        onSuccess={googleSucces}
        onError={() => console.log("Login Failed")}
      />
    ) : (
      <GoogleLogin
        className="button-google"
        size="large"
        text=""
        onSuccess={googleSucces}
        onError={() => console.log("Login Failed")}
      />
    );
  };
  return (
    <AppBar
      position="relative"
      color="nav"
      style={{ padding: 6, zIndex: "10" }}
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
            <GoogleButton />
          )}
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default NavBar;
