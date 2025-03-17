//1. import express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
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

app.post("/signup", async (req, res)=>{
    //error handling -> if an error comes, the server should not crash, it should send the error to the client
    try{
        

        const user = new User(req.body);
        //user is an object of the User class

        //req.body is the data that is coming from the client
        await user.save();
        res.status(201).send(user);
    }
    catch(err){
        res.status(400).send(err);
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

app.get("/user/:email", async(req, res)=>{
    try{
        const email = req.params.email;
        const user = await User.findOne({email:email});

        if(!user){
            res.status(404).send("User not found");
        }
        res.status(200).send(user);
    }
    catch(err){
        res.status(400).send(err);
    }
})

app.post("/login", async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email:email});
        console.log(user);
        if(!user){
            res.status(404).send("User not found");
        }

        if(user.password === password){
            res.status(201).send("Login successful");
        }
        else{
            res.status(400).send("Invalid password");
        }        

    }
    catch(err){
        res.status(400).send(err);
    }
})
//'/login', '/signup'

//update user information by email
//dynamic routing 

app.patch("/update/:email", async (req, res)=>{
    try{

        //route PARAMETER -> params 
        //extract the email from the url 
        const email = req.params.email;
        //find the user
        const user = await User.findOne({
            email:email
        });

        if(!user){
            res.status(404).send("User not found");
        }

        //update the user
        //req.body-> the data that is coming from the client
        
        user.set(req.body);
        await user.save();
        res.status(201).send(user);
    }
    catch(err){
        res.status(400).send(err);
    }
});



//logout
app.post("/logout", (req, res)=>{
    //logout the user using the token 
    //delete the token from the database
    res.status(201).send("Logout successful");

});


app.get("/countusers", async (req, res)=>{
    try{
        let count = await User.aggregate([
            {
                //match function is used to filter the data based on a particular field
                $match:{
                    role:'user'
                }
            },
            {
                //group function is used to group the data based on a particular field
                //count the number of users based on the age
                $group:{
                    _id:'$age',
                    count:{$sum:1}
                }
            },
            {
                //sort the data based on the id
                //1 -> ascending order
                // -1 -> descending order

                $sort:{
                    _id:1
                }
            }
        ])

        res.status(200).send(count);
    }
    catch(err){
        res.status(401).send(err);
    }
})

//delete user by email
app.delete("/delete", async (req, res)=>{
    try{
        const email = req.body.email;
        const user = await User.findOneAndDelete({
            email:email
        });
        res.status(201).send("The user has been deleted");
    }
    catch(err){
        res
        .status(400)
        .send(err);
    }
})



//forgot password by email
app.post("/forgotpassword", async (req, res)=>{
    try{
        const email = req.body.email;
        const user = await User.findOne({
            email:email
        });
        if(!user){
            res.status(404).send("User not found");
        }
        //logic to send an email to the user
        res.status(201).send("Password reset link sent successfully");
    }
    catch(err){
        res.status(400).send(err);
    }
});


//update password by email
app.patch("/updatepassword/:email", async (req, res)=>{
    try{
        const email = req.params.email;
        const user = await User.findOne({
            email:email
        });
        if(!user){
            res.status(404).send("User not found");
        }
        user.password = req.body.password;
        await user.save();
        res.status(201).send("Password updated successfully");
    }
    catch(err){
        res.status(400).send(err);
    }

});



app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})