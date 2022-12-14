import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getBookings } from "../../actions/bookings";
import { Container, Grow, Grid, Box, Typography } from "@mui/material";
import Bookings from "../../components/Bookings/Bookings";
import Form from "../../components/Form/Form";
import AnimatedBackground from "./AnimatedBackground/AnimatedBackground";
const Home = ({ darkMode }) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <>
      <AnimatedBackground darkMode={darkMode} />
      <Grow in>
        <Container style={{ position: "relative", marginTop: "60px" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item justifyContent="center" xs={12} sm={4}>
              <Typography
                variant="h5"
                my={2}
                color="headers.main"
                fontWeight="bold"
              >
                Gestiona tus reservas
              </Typography>
              <Box>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} style={{ marginBottom: 30 }}>
              <Typography
                variant="h5"
                my={2}
                color="headers.main"
                fontWeight="bold"
              >
                Reservas
              </Typography>
              <Bookings setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
