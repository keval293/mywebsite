var mongoose = require('mongoose');

//mongoose connection
mongoose.connect('mongodb://localhost:27017/loginApp',{useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connection
.once('open',()=>{console.log("mongoose is connected");})
.on('error',(err)=>{console.log(err);});

module.exports = mongoose;