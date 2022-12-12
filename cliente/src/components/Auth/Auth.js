import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import GoogleIcon from "@mui/icons-material/Google";
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {};
  const handleChange = () => {};

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    handleShowPassword(false);
  };
  const googleFailure = (error) => {
    console.log(error);
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);
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

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: "20px", marginTop: 20 }}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <h4>{isSignedUp ? "Sign up" : "Iniciar Sesion"}</h4>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <>
                <Input
                  name="firstName"
                  label="Nombre"
                  autoFocus
                  onChange={handleChange}
                />
                <Input
                  name="firstName"
                  label="Nombre"
                  autoFocus
                  onChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignedUp && (
              <Input
                name="confirmPassword"
                label="Repetir contrasenia"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <GoogleLogin
            type="icon"
            logo_alignment="center"
            shape="circle"
            size="medium"
            text=""
            onSuccess={googleSucces}
            onError={() => console.log("Login Failed")}
          />
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
