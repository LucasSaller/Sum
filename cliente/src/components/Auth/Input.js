import React from "react";
import { TextField, IconButton, Grid, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";

const Input = ({
  half,
  name,
  label,
  handleChange,
  handleShowPassword,
  autoFocus,
  type,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        autoFocus={autoFocus}
        type={type}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        InputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </Grid>
  );
};

export default Input;
