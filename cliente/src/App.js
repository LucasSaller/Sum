import React, { useEffect, useState } from "react";
import { Container, Typography, Grow, Grid, AppBar } from "@mui/material";
import { useDispatch } from "react-redux";
import { getBookings } from "./actions/bookings";
import Bookings from "./components/Bookings/Bookings";
import Form from "./components/Form/Form";
const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h4" align="center">
          Reservas
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
              <Bookings setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
export default App;
