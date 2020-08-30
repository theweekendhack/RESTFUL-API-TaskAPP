const express = require("express");
require("dotenv").config({path: "config/keys.env"});
const mySQL = require("./config/MySQLDOA.js");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const session = require("express-session");


//importation of controllers
const taskController = require("./controllers/Task.js");
const authController = require("./controllers/Auth.js");

//creation of express application
const app  = express();


//3rd party middleware 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }//This means that a session will only be created if the protocol is HTTPS
  }))

//map my controllers to express 
app.use("/task",taskController);
app.use("/auth",authController);



//create of Web Server 
app.listen(process.env.PORT,()=>{
    console.log(`Web Sever is up and running`);

    mySQL.init();
})



