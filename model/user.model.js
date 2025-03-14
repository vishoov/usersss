//we will define the user schema 
//user schema helps in defining the structure of the user collection
//mongoose -> helps in defining the schema and model

//mongoose is a driver that helps in connecting to the mongodb database
const mongoose  = require('mongoose');
//blueprint for the user collection
const userSchema = new mongoose.Schema({
    //here we define the structure of the user collection
    name:{
        type:String,
        //required-> this field is required or not
        required:[true, `Name is required`],
        //unique-> this field should be unique or not 
        unique:false,
        //trim-> this will remove the extra spaces from the beginning and the end of the string
        trim:true,

    },
    email:{
        type:String,
        required:[true, `Email is required`],
        unique:[true, 'Email already exists'],
        trim:true,
        //lowercase: true-> this will convert the email to lowercase
        lowercase:true,

    },
    age:{
        type:Number,
        required:[true, `Age is required`],
        min:[18, 'Age should be greater than 18'],
        max:[100, 'Age should be less than 100']       
    },
    password:{
        type:String,
        required:[true, `Password is required`],
        trim:true,
        //minlength-> this will define the minimum length of the password
        minLength:[6, 'Password should be greater than 6'],
        //maxlength-> this will define the maximum length of the password
        maxLength:[20, 'Password should be less than 20']
    },
    phone:{
        type:Number,
        required:[true, `Phone is required`],
        min:1000000000,
        max:9999999999
    },
    role:{
        type:String,
        required:true,
        //enum-> this will define the values that are allowed for this
        enum:['admin', 'user'],
        default:'user'
    },
    address:{
        type:String,
        required:false,
        trim:true

    }
});


//model-> this will create the collection in the database
mongoose.model('User', userSchema);

//export the model
module.exports = mongoose.model('User');