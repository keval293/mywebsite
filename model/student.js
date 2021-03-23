const mongoose = require('../model/dbConnection');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    attendence:{
        type:String,
        required:true,
        trim:true,
    }
});

module.exports = mongoose.model("students",studentSchema);