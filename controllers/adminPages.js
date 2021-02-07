const BlogModel = require("../model/blogModel.js"); 


//Blog page
exports.getAdminBlogCreatePage = (req, res, next) => {

    res.render("blog/createBlogAdmin.ejs", {
 
       pageTitle : "Create Blog Page",
       path : "createBlog",
       blogData : {
          title : null,
          description : null,
          text : null,
          backgroundColor : ""
       }
 
    })
   
 };

//Blog page
exports.getAdminBlogUpdatePage = (req, res, next) => {

   const parmsData = req.params.blogId;

   BlogModel.findById({_id: parmsData})
   .then(blog => {

      res.render("blog/createBlogAdmin.ejs", {

         pageTitle : "Update Blog Page",
         path : "updateBlog",
         blogData : blog
   
      })

   })   
  
};

//create Blog
exports.CreateBlog = (req, res, next) => {

    const {Btitle, Bdescription, BMarkDown, Bavcolor} = req.body;
    const {userID, userName, userLastName} = req.session.userInfo;

    const fullName  = userName +" "+ userLastName;

     const newBlog = new BlogModel({
            title : Btitle,
            description : Bdescription, 
            text : BMarkDown,
            backgroundColor : Bavcolor,
            author : {
               name : fullName,
               id : userID
            }
     });

     newBlog.save()
     .then(blog => {
        res.redirect("/blogs")
     })
   
 };


//update blog
exports.updateEditBlogPage = (req, res, next) => {

   const id = req.params.updateBlog;
   const {Btitle, Bdescription, BMarkDown, Bavcolor} = req.body;

   BlogModel.findById({_id: id})
   .then(blog => {

      blog.title = Btitle;
      blog.description = Bdescription; 
      blog.text = BMarkDown;
      blog.backgroundColor = Bavcolor;

      return blog.save()
      .then(updated => {
         res.render("blog/blog", {

            pageTitle : "Blog Page",
            path : "blog",
            blogData : blog
      
         })
      })

   })
   .catch(err => console.log(err));
  
};


exports.deleteBlog = (req, res, next) => {

   const id = req.params.delBlog;

   BlogModel.deleteOne({_id: id})
   .then(deleted => {
      res.redirect("/blogs")
   })
   .catch(err => console.log(err))
   
};