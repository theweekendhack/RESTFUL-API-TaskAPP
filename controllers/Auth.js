const express  = require("express");
const router = express.Router();

const User = require("../models/POJO/User.js");
const userModel = require("../models/models/User.js");
const bcrypt = require("bcryptjs");


/*
Method : POST
Route    /auth/  
Description : To Authenticate user and return the user information
*/
router.post("/", async (req,res)=>{

    
    const user  =  new User();

    user.password = req.body.password;
    user.email  =  req.body.email;

    const errors = {
        email: null,
        password: null
    }

    let isError = false;
    //validation 

    //test to see if an email was entered
    if(user.email == "")
    {
        isError = true;
        errors.email =  "You must enter an email"
    }

    //test to see if a password was entered
    if(user.password == "")
    {
        isError = true;
        errors.password = "You must enter a password"
    }


    //if both email and password were entered

    if(isError == false)
    {
            // authentication algorithm 
            //1. Test to see if the email exists
            //2.if the email does exists then we want to pull the user information 
            //based on that email
            //3.TEst to see if the password entered  == password stored
            //4create session
            //5send back the session pojo and message saying user has been authenticated

            try
            {
                const userResult = await userModel.getUserByEmail(user.email)
               
                if(userResult)
                {

            
                    //check the password
                    const response = await bcrypt.compare(user.password,userResult.password)
                    
                    //The has password matches the password you entered in the form
                    if(response)
                    {
                        
                        req.session.user = userResult;

                        res.status(200).json({
                            messge: "User have been authneticated",
                            userResult
                        })
                    }

                    else
                    {
                        res.status(400).json({
                            message : "Email and/or pasword was entered incorrectly"
                        })
                    }

                }
                else
                {
                    res.status(400).json({
                        message: "Email/Password is incorrect"
                    })
                }
              
            }
            catch(err)
            {
                res.status(500).json({
                    message :"Server Error ocurred",
                    err
                })
            }
           
        


    }
    else
    {
        res.status(400).json({
            message : "User is missing credentials",
            errors
        })
    }

    res.status(200).json({

        message  : "User information",
        data : user
    })

})



/*
Method : GET
Route    /auth/logout 
Description : This is used to destory the session and the cookie
*/
router.get("/logout",(req,res)=>{

    req.session.destroy();
})



module.exports  = router;