const express = require("express");
const routes  = express.Router();

// // import is-auth
// const isAuth = require("../middleware/is-auth.js");

// import all controllers
const registrationControllers = require("../controllers/registrationControllers.js");

//login page
routes.get("/login",registrationControllers.getLoginPage);

routes.get("/logout",registrationControllers.getLogOutPage);

routes.post("/login",registrationControllers.postLoginPage);

routes.get("/register",registrationControllers.getRegisterPage);

routes.post("/register",registrationControllers.postRegisterPage);

module.exports = routes;
