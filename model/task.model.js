const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:false

    },
    description:{
        type:String,
        required:true,
        trim:true,
        unique:false
    },
    status:{
        type:String,
        required:true,
        trim:true,
        unique:false,
        enum:["pending","completed", "in-progress"],
        default:"pending",
        
    },
    userAssigned:{
        //this is the id of the user who is assigned the task
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
        unique:false
    },
    

}, {
    timestamps:true
})


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;