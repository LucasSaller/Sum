import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../../actions/bookings";
import { Paper, IconButton } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const DesktopBookings = ({ setCurrentId, bookings, past }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, fontWeight: "bold" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">Departamento</TableCell>
            <TableCell align="center">Dia&nbsp;</TableCell>
            <TableCell align="center">Turno&nbsp;</TableCell>
            {user && !past && (
              <TableCell align="right">Acciones&nbsp;</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {booking.name}
              </TableCell>
              <TableCell align="center">{booking.apartment}</TableCell>
              <TableCell align="center">{booking.date}</TableCell>
              <TableCell align="center">{booking.time}</TableCell>
              <TableCell align="right">
                {user?.data.sub === booking.creator && !past && (
                  <>
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
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DesktopBookings;
