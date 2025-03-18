const router = require("express").Router();
const Task = require("../model/task.model");
const User = require("../model/user.model");


// create a task,
router.post("/task", async (req, res)=>{
    try{
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    }
    catch(err){
        res.status(400).send(err);

    }
});

// update the task,
router.patch("/task/:id", async (req, res)=>{
    try{
        const id = req.params.id;
        const task = await Task.findByIdAndUpdate(id, req.body);
        res.status(200).send(task);
    }
    catch(err){
        res.status(400).send(err);
}
});


// delete task,
router.delete("/task/:id", async (req, res)=>{
    try{
        const id = req.params.id;
        const task = await Task.findByIdAndDelete(id);
        res.status(200).send(task);
    }
    catch(err){
        res.status(400).send(err);
    }
});


// fetch tasks 
router.get("/tasks", async (req, res)=>{
    try{
        const tasks = await Task.find();
        res.send(tasks);
    }
    catch(err){
        res.status(400).send(err);
    }
});


module.exports = router;