const router = require("express").Router();
const User = require("../model/user.model");


router.post("/signup", async (req, res)=>{
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

router.get("/users", async (req, res)=>{
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

router.get("/user/:email", async(req, res)=>{
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

router.post("/login", async (req, res)=>{
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

router.patch("/update/:email", async (req, res)=>{
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
router.post("/logout", (req, res)=>{
    //logout the user using the token 
    //delete the token from the database
    res.status(201).send("Logout successful");

});


router.get("/countusers", async (req, res)=>{
    try{
        //aggregate functions inputs an array of filters and returns the data based on the filters
        let count = await User.aggregate([
            {
                //match function is used to filter the data based on a particular field
                $match:{
                    role:'user',
                    // age:{$gt:18}
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
router.delete("/delete", async (req, res)=>{
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

router.post("/addmultipleusers", async (req, res)=>{
    try{
        const users = req.body;
        const result = await User.insertMany(users);
        res.status(201).send(result);
    }
    catch(err){
        res.status(400).send(err);
    }
})



//forgot password by email
router.post("/forgotpassword", async (req, res)=>{
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
router.patch("/updatepassword/:email", async (req, res)=>{
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

module.exports = router;