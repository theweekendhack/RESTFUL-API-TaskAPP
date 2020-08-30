
/*
The purpose of this middlware is to test to see if a session exists.
If the session exists, that means that the user is logged in
if a session doesn't exists,  that means the user is not logged
*/
const isAuth = (req,res,next)=>{

    if(req.session.user)
    {
        next()
    }
    else
    {
        res.status(400).json({
            message: "Not Authenticated"
        })
    }
}


module.exports = isAuth;