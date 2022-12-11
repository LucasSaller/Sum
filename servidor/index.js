import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import bookingRoutes from "./routes/bookings.js";

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use("/bookings", bookingRoutes);

const CONNECTION_URL =
  "mongodb+srv://lsaller:DZ9LwfOsNt6YJ6Ly@cluster0.zzcukbh.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", true);
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server runing on port ${PORT} `))
  )
  .catch((error) => console.log(error.message));
