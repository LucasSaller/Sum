import React, { useState } from "react";
import { Paper } from "@mui/material";
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
    <Container maxWidth="sm">
      <Paper style={{ padding: "20px", marginTop: 20, textAlign: "center" }}>
        <h3>Inicia Sesion con Google</h3>
        <GoogleLogin
          className="button-google"
          logo_alignment="center"
          size="medium"
          text=""
          onSuccess={googleSucces}
          onError={() => console.log("Login Failed")}
        />
      </Paper>
    </Container>
  );
};

export default Auth;
