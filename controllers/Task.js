const express  = require("express");
const router = express.Router();
const taskModel = require("../models/models/Task.js");
const Task = require("../models/POJO/Task.js");


/*
Method : GET
Route    /task  
Description Get all tasks
*/
router.get("/",async (req,res)=>{

    try
    {
        const tasks =  await taskModel.getMyTasks(24);


        res.status(200).json({
            message : "A List of all the user tasks",
            data : tasks,
            totalCount : tasks.length
        });
    }

    catch(err)
    { 
        res.status(500).json({
        message : `Error ${err}`    
        })
        
    }


    //res.status(200).send("It works");
})

/*
Method : GET
Route    /task/:id
Description Get a specific task
*/
router.get("/:id",(req,res)=>{

    taskModel.getATask(req.params.id)
    .then(task=>{
       
        if(task)
        {   
            res.status(200).json({
                message : `Get task based on ID : ${req.params.id}`,
                data : task
            });

        }
        else
        {
            res.status(400).json({
                mesage : `${req.params.id} IS NOT A VALID ID!`
            })
        }
       

    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`    
        })
    })
    
})

/*
Method : POST
Route    /task  
Description Create a task
/*

*/

router.post("/",(req,res)=>{

    
    const task = new Task();
    task.title =  req.body.title;
    task.description = req.body.description
    task.user = 24;

    taskModel.createTasks(task)
    .then(()=>{
            res.status(200).json({
                message: "Task was created"
            })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`    
        })
    })
})

/*
Method : PUT
Route    /task/:id  
Description Update a specific task
*/
router.put("/:id",(req,res)=>{


})


/*
Method : DELETe
Route    /task/:id  
Description Delete a specific task
*/
router.delete("/:id",async (req,res)=>{

    try
    {
        await taskModel.deleteTask(req.params.id)

        res.status(200).json({
            message: `Task ${req.params.id} was deleted`
        })
    }
    catch(err)
    {
        res.status(500).json({
            message : `Error ${err}`    
        })
    }

})



module.exports = router;