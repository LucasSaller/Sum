const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./routes/bookings.js");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use("/api/bookings", bookingRoutes);
app.get("/", (request, response) => {
  response.send("Hola mundo");
});

const CONNECTION_URL =
  "mongodb+srv://lsaller:DZ9LwfOsNt6YJ6Ly@cluster0.zzcukbh.mongodb.net/test?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server runing on port ${PORT} `))
  )
  .catch((error) => console.log(error.message));

module.exports = app;
