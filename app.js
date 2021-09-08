const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const port = 3000;

const app = express();

// Set motor engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// Process data and send forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Environment variables
dotenv.config({ path: "./env/.env" });

// Work with cookies
app.use(cookieParser());

app.listen(port, () => {
  console.log("Listening on port:", port);
});

// Router
app.use("/", require("./routes/router"));
