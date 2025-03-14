//1. import express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//mongoose is a driver for mongodb database
//that would help us in managing the data and sending the data to the database
app.use(express.json());


const User = require('./model/user.model');

const mongodb = "mongodb://localhost:27017/accio"

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

app.post("/signup", async (req, res)=>{
    //error handling -> if an error comes, the server should not crash, it should send the error to the client
    try{
        const user = new User(req.body);
        //user is an object of the User class
        //req.body is the data that is coming from the client
        await user.save();
        res.send(user);
    }
    catch(err){
        res.send(err);
    }
});

app.get("/users", async (req, res)=>{
    //error handling and async js
    try{
        const users =await  User.find();
        // db.trial.find()-> User.find()
         res.send(users);
    }
    catch(err){
        res.send(err);
    }    
})



app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})