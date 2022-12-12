import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import "./styles.css";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <Paper style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h6" fontWeight="bold">
        Para poder crear una reserva
      </Typography>
      <GoogleLogin
        className="button-google"
        logo_alignment="center"
        size="medium"
        text=""
        onSuccess={googleSucces}
        onError={() => console.log("Login Failed")}
      />
    </Paper>
  );
};

export default Auth;
