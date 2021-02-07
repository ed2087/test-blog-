const AccesKeyDB = require("../model/accessKey.js"); 
const UserModel = require("../model/userModel.js"); 
const {hashIt, compareIt, randomKey} = require("../utils/bcrypt.js"); 

//Login page
exports.getLoginPage = (req, res, next) => {

    res.render("login", {
 
       pageTitle : "Login Page",
       path : "login"
 
    })
   
 };


 //Login page
exports.postLoginPage = (req, res, next) => {

    const {Xemail, Xpassword} = req.body;

    UserModel.findOne({email : Xemail})
    .then(user => {  

        if(!user){//email not correct
            console.log("email not coorect")
            return                
         }

         return compareIt(Xpassword, user.password)
         .then(pass => {

            if(!pass){//password not correct
                console.log("password not corret")      
                return          
             }
             
             req.session.userInfo = {
                isAuthenticated : true,
                userName : user.firstName,
                userLastName : user.lastName,
                userID : user._id,
                userAuthority : user.authority   
             };

             req.session.save(err => {
                 console.log(err)
                 res.redirect("/");

             })

         })

    })
    .catch(err => console.log(err))
  
};

//Login page
exports.getLogOutPage = (req, res, next) => {

    req.session.destroy((err) => {        
        res.redirect("/")
    })
   
 };

 
 //Register page
 exports.getRegisterPage = (req, res, next) => {
 
 
    res.render("register", {     
 
       pageTitle : "Register Page",
       path : "register"
 
    })
   
 };


  //Register page post
  exports.postRegisterPage = (req, res, next) => {
     

    const {RaccesKey, Rname, RlastName, Remail, Rpassword, RveryfyPassword, } = req.body;


    if(Rpassword != RveryfyPassword){//check if passwords are the same
        console.log("not the same password")
        return
    }

    UserModel.findOne({email : Remail})//try to find email 
    .then(eml => {

        if(!eml){//if email not found

            AccesKeyDB.findOne({newAccesKey: RaccesKey})
            .then(key => {
        
                if(key && key.ownerID.name == Rname && key.ownerID.lastName == RlastName){                    
       
                    hashIt(Rpassword)//hash password 
                    .then(hash => {//password has been hashed
        
                        const newUser = new UserModel({//create new user model
                            firstName : Rname,
                            lastName : RlastName,
                            email : Remail,
                            password : hash,
                            authority : "user"
                        })
        
                        return newUser.save()
                        .then(usr => {
                            console.log("superuser " + Rname + " has been created")
                            res.redirect("/login");
                        })
        
                    }) 
        
                }else{//if access key not correct || name || lastname

                    console.log("nop")

                }
        
            })

        }else{//if email is already used
                console.log("email is used")
        }
    })     
    .catch(err => console.log(err));
  
 };