//we will define the user schema 
//user schema helps in defining the structure of the user collection
//mongoose -> helps in defining the schema and model

//mongoose is a driver that helps in connecting to the mongodb database
const mongoose  = require('mongoose');
//blueprint for the user collection
const userSchema = new mongoose.Schema({
    //here we define the structure of the user collection
    name:{
      
        //karan kumar -> name -> string
        type:String,
        //required-> this field is required or not
        // required:[true, `Name is required`],
        //unique-> this field should be unique or not 
        unique:false,
        //trim-> this will remove the extra spaces from the beginning and the end of the string
        trim:true,

    },
    email:{
        type:String,
        required:[false, `Email is required`],
        //trim-> this will remove the extra spaces from the beginning and the end of the string
        // "    hello "-> "hello"

        // trim:true,
        //lowercase: true-> this will convert the email to lowercase
        // lowercase:true,
        //validate-> this will validate the email
      
            //value-> this is the email that is coming from the user
            //regex-> regular expression
            //regex is used to validate the email
            //regex is a pattern matching tool
            //username@serviceprovider.com/.in/.org/.co.in

        validate:{
            validator: function(value){
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
            },
            message: function(props){
                return `${props.value} is not a valid email`;
            }
            //Hello123_cool@custom_server.ai/.com/.in/.org
        },
    },
    
    age:{
        type:Number,
        required:[false, `Age is required`],
        //min-> this will define the minimum value of the age
        min:[18, 'You are too young'],
        //max-> this will define the maximum value of the age
        max:[100, 'Age should be less than 100']       
    },

    password:{
        type:String,
        required:[false, `Password is required`],
        trim:true,
        //minlength-> this will define the minimum length of the password
        minLength:[6, 'Password should be greater than 6'],
        //maxlength-> this will define the maximum length of the password
        maxLength:[20, 'Password should be less than 20']
    },
    phone:{
        type:Number,
        required:[false, `Phone is required`],
        min:1000000000,
        max:9999999999
    },
    role:{
        type:String,
        // required:true,
        //enum-> this will define the values that are allowed for this
        enum:['admin', 'user'],
        default:'user'
    },
    address:{
        type:String,
        required:false,
        trim:true

    },
    country:{
        type:String,
        required:false,
        trim:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
});


//model-> this will create the collection in the database
const user = mongoose.model('User', userSchema);

//export the model
module.exports = user;