const express = require("express");
const router = express.Router();

// Constant to define the controller
const authController = require("../controllers/authcontrollers");

// Router for Views
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login", { alert: false });
});

router.get("/register", (req, res) => {
  res.render("register");
});

// Router for method controllers
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
