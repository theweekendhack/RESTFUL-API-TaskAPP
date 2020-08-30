const express = require("express");
require("dotenv").config({path: "config/keys.env"});
const mySQL = require("./config/MySQLDOA.js");
const taskController = require("./controllers/Task.js");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")

//creation of express application
const app  = express();



//3rd party middleware 

app.use(bodyParser.urlencoded({ extended: false }))

//load my task 
app.use("/task",taskController)

//create of Web Server 
app.listen(process.env.PORT,()=>{
    console.log(`Web Sever is up and running`);

    mySQL.init();
})



