const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();

/* create a server express */
const app = express();

/* db connection */
dbConnection();

/* use cors */
app.use(cors());

/** bodyParser para parsear los request*/
app.use(express.json());

/* public directory */
app.use(express.static("public"));

/* routes */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

/* listen request */
app.listen(process.env.PORT, () => {
  console.log("server online on port:", process.env.PORT);
});
