const AccesKeyDB = require("../model/accessKey.js"); 
const {hashIt, compareIt, randomKey} = require("../utils/bcrypt.js"); 
const BlogModel = require("../model/blogModel.js"); 


exports.getHomePage = (req, res, next) => {


     res.render("index", {

        pageTitle : "Home Page",
        path : "home"

     })
    
};

//Blogs page
exports.getBlogsPage = (req, res, next) => {

   BlogModel.find()
   .then(blog => {
      res.render("blog/blogList", {

         pageTitle : "Blogs Page",
         path : "blogs",
         blogData : blog
   
      })
   })   
  
};

//Blog page
exports.postBlogPage = (req, res, next) => {

   const id = req.params.blogId;

   BlogModel.findById(id)
   .then(blog => {
      res.render("blog/blog", {

         pageTitle : "Blog Page",
         path : "blog",
         blogData : blog
   
      })
   })   
  
};

//404 page
exports.get404 = (req, res, next) => {

    res.render("404", {

        pageTitle : "404 Page",
        path : "404"

     })
    
};


//012p4@12@8$6+8&10&10g162a0+12191


//this middleware will genrate a acces key for 5m 
//in order to create a new user you will need a acceskey and the first and last name

// randomKey()
// .then(ran => {

//    const newKey = new AccesKeyDB({

//          newAccesKey : ran,
//          ownerID : {
//             name : "edgar",
//             lastName : "robledo"
//          }
         
//    })

//    newKey.save()

// })