const express = require("express");
require("dotenv").config({path: "config/keys.env"})

//creation of express application
const app  = express();


app.get("/",(req,res)=>{

    res.status(300).send("<h1>dkhgdhgdh</h1>")

})

app.get("/task",(req,res)=>{

    
})

//create of Web Server 
app.listen(process.env.PORT,()=>{
    console.log(`Web Serer is up and running`);
})