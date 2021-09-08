const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const connectDB = require("../database/db");
const { promisify } = require("util");
const { use } = require("../routes/router");

// METHOD TO REGISTER
// Register
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;
    let passHash = await bcryptjs.hash(pass, 8);

    // Instert in 'users' table
    connectDB.query(
      "INSERT INTO users SET ?",
      {
        name: name,
        user: user,
        pass: passHash,
      },
      (error, result) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const pass = req.body.pass;

    if (!user || !pass) {
      res.render("index", {
        alert: true,
        alertTitle: "Warning!",
        alertMessage: "Please, enter User and Password...",
        alertIcon: "info",
        showConfirmButtom: true,
        timer: false,
        ruta: "login",
      });
    } else {
      connectDB.query(
        "SELECT FROM users WHERE user = ?",
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pass, results[0].pass))
          ) {
            res.render("login", {
              alert: true,
              alertTitle: "Warning!",
              alertMessage: "Please, enter User and Password...",
              alertIcon: "error",
              showConfirmButtom: true,
              timer: false,
              ruta: "login",
            });
          } else {
            // Login OK
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_TIME_EXPIRE,
            });
            console.log("TOKEN: " + token + " para el usuario " + user);

            // Configure Cookies
            const cookiesOptions = {
              expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              alertTitle: "Successful Connection!",
              alertMessage: "Successful Login!",
              alertIcon: "success",
              showConfirmButtom: false,
              timer: 800,
              ruta: "",
            });
          }
        }
      );
    }
    console.log(user + "-" + pass);
  } catch (error) {
    console.log(error);
  }
};
