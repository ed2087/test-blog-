module.exports = (req, res, next) => {

    if(!req.session.userInfo){

        return res.redirect("/LogIn");// if not logged in redirect

    }

    next();// if user is logged in continue        

};