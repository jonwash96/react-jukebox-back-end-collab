//* MNT
require("dotenv").config();
require("./db/connection.js");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const tracksController = require("./controllers/tracks");

//* DATA

//* VAR
const PORT = process.env.PORT || 3000;

//* APP
const app = express();

//* MID
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors);

//* ROUTE
app.get("/", (req, res) => {
  res.status(201).json({
    message: "This is the home route",
  });
});

app.use("/tracks", tracksController);

//* IO
app.listen(PORT, () =>
  console.log(
    `Server Running on port ${PORT}. Access at [http://localhost:${PORT}]`,
  ),
);
