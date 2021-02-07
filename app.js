const express = require("express");
const bodyParser = require("body-parser"); 
const mongooseDB = require('mongoose');
const path = require("path");
const sessionExpress = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(sessionExpress);
const csrf = require("csurf");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");


//file imports 
const mainRoute = require("./routes/mainRoutes.js");
// const serviceRoute = require("./routes/servicesRoutes.js");
const registrationRoute = require("./routes/registrationRoutes.js");
const adminRoute = require("./routes/adminRoutes.js");

// mongoose key
const MONGODB_URI = `mongodb+srv://Data:***********@cluster0.bnlgv.mongodb.net/Data?retryWrites=true&w=majority`;

//essential's
const ports = "3000";

// activate express
const app = express();

//start session store
const store = new MongoDBStore({

  uri : MONGODB_URI,// where the data is going
  collection : "sessions"

});

const accessLogStream = fs.createWriteStream(// create a fs file to save all incoming logs
  path.join(__dirname, "access.log"),
  {flags: "a"}
);

app.use(morgan("combined", {stream: accessLogStream}));

// helmet secure header
app.use(helmet());

// compression
app.use(compression());

//start the token generator token
const csrfProtection = csrf();

//ejs
app.set("view engine", "ejs");
app.set("views", "views");

// must have before middlewares   (BODY PARSER)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // this parser will only parse simple forms

//allow css js files
app.use(express.static(path.join(__dirname, "public")));

//start sessions
app.use(sessionExpress({

  secret : "passwordOfYourChoice",
  resave : false,//this wiil stop it from saving where it dosent have to
  saveUninitialized : false,
  store : store, // add store session
  expires: new Date(Date.now() + (30 * 86400 * 1000))

}));

// add csurf protection
app.use(csrfProtection);

// pass data to views 
app.use((req, res, next) => {
    
    res.locals.userData = req.session.userInfo;
    res.locals.csrfToken = req.csrfToken();
    
    next();

});

//registration routes
app.use(registrationRoute);

//admin routes
app.use(adminRoute);

//services pages
//app.use(serviceRoutes);

//meddlewire
app.use(mainRoute);//main home pages

//server
mongooseDB.connect(
    MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(result => {
    app.listen(process.env.PORT || ports, () =>{
        console.log("running in localhost " + ports);
    })
  })
  .catch(err => console.log(err));


