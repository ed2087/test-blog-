const express = require("express");
const routes  = express.Router();

// // import is-auth
// const isAuth = require("../middleware/is-auth.js");

// import all controllers
const mainControllers = require("../controllers/mainControllers.js");


//home page
routes.get("/",mainControllers.getHomePage);

//blog's page
routes.get("/blogs",mainControllers.getBlogsPage);

//blog page
routes.post("/blog/:blogId",mainControllers.postBlogPage);

//404
routes.use(mainControllers.get404);


module.exports = routes;
