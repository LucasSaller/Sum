import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookings } from "../../actions/bookings";
import { Container, Grow, Grid } from "@mui/material";

import Bookings from "../../components/Bookings/Bookings";
import Form from "../../components/Form/Form";
const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <Grow in>
      <Container style={{ marginTop: "24px" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Bookings setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
