const mongoose = require('./dbConnection');

//schema for collections
const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    confrimPassword:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    qualification:{
        type:String,
        required:true,
        trim:true,
    },
    department:{
        type:String,
        required:true,
        trim:true,
    }
});

module.exports =  mongoose.model("Users",userSchema);
