import { Stack, Paper, IconButton, CardActions } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../../actions/bookings";

const MobileBookings = ({ bookings, setCurrentId, user, past }) => {
  const dispatch = useDispatch();
  return bookings.map((booking, id) => (
    <Paper key={id}>
      <Stack
        direction="row"
        spacing={3}
        paddingX={2}
        paddingY={2}
        alignItems="center"
        justifyContent={user && !past ? "left" : "space-around"}
      >
        <h5>{booking.name}</h5>
        <h5>{booking.apartment}</h5>
        <h5>{booking.date}</h5>
        <h5>{booking.time}</h5>
        {user?.data.sub === booking.creator && !past && (
          <Stack direction="column">
            <IconButton
              size="small"
              aria-label="edit"
              color="warning"
              onClick={() => setCurrentId(booking._id)}
            >
              <EditTwoToneIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="delete"
              color="error"
              onClick={() => dispatch(deleteBooking(booking._id))}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Paper>
  ));
};

export default MobileBookings;
