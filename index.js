//1. import express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
//mongoose is a driver for mongodb database
//that would help us in managing the data and sending the data to the database
app.use(express.json());


const User = require('./model/user.model');

const mongodb = "mongodb://localhost:27017/accio";


//mongoose.connect(databaseURL, options)-> this connects to the database using a promise
mongoose.connect(mongodb)
.then(()=>{
    console.log("Connected to the database");
})
.catch((err)=>{
    console.log("Error connecting to the database", err);
})

app.get("/", (req, res)=>{
    res.send("Welcome to the user management API service");
});


app.use(userRoutes);
app.use(taskRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})