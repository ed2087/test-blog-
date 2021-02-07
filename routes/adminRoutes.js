const express = require("express");
const routes  = express.Router();

// import all controllers
const adminControllers = require("../controllers/adminPages.js");

// import is-auth
const isAuth = require("../middleware/is-auth.js");

routes.get("/adminBlogPage", isAuth, adminControllers.getAdminBlogCreatePage);
//create new blog
routes.post("/createBlog", isAuth, adminControllers.CreateBlog);


//edit page
routes.post("/adminBlogPage/:blogId", isAuth, adminControllers.getAdminBlogUpdatePage);
//update page
routes.post("/updateBlog/:updateBlog", isAuth, adminControllers.updateEditBlogPage);
//update blog
routes.post("/updateBlog/:updateBlog", isAuth, adminControllers.updateEditBlogPage);
//delete blog
routes.post("/deleteBlog/:delBlog", isAuth, adminControllers.deleteBlog);

module.exports = routes;
