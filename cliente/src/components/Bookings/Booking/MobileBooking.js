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
        paddingX={user?.data.sub === booking.creator && !past ? 1 : 2}
        paddingY={user?.data.sub === booking.creator && !past ? 1 : 2}
        alignItems="center"
        justifyContent={
          user?.data.sub === booking.creator ? "space-between" : "left"
        }
      >
        <h5>{booking.name.split(" ")[0]}</h5>
        <h5>{booking.apartment}</h5>
        <h5>{booking.date}</h5>
        <h5>{booking.time}</h5>
        {user?.data.sub === booking.creator && !past && (
          <Stack direction="column" justifyContent="end">
            <IconButton
              size="medium"
              aria-label="edit"
              color="warning"
              onClick={() => setCurrentId(booking._id)}
            >
              <EditTwoToneIcon />
            </IconButton>
            <IconButton
              size="medium"
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
