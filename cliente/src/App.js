import React, { useEffect } from "react";
import {
  Container,
  Appbar,
  Typography,
  Grow,
  Grid,
  AppBar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "./actions/bookings";
import Bookings from "./components/Bookings/Bookings";
import Form from "./components/Form/Form";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h4" align="center">
          Bookings
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Bookings />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
export default App;
