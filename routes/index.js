var express = require('express');
var router = express.Router();
var users = require('../model/user');
var students = require('../model/student');
var id = "";
require('dotenv').config();
var jwtr = require('jwtr');



/* GET home page. */
router.get('/home',authenticateToken,(req, res) => {
    res.render('index', { title: "Home", path: "home", js: "" });
}); 

router.get('/login', (req, res) => {
    res.render('index', { title: "Login", path: "login", js: "login.js" });
});

router.get('/profile',authenticateToken, (req, res) => {
    id = id;
    users.findOne({_id:id})
    .then((data)=>{
        res.render('index', { title: "Profile", path: "profile", js: "",data : data});
    }).catch((err)=>{
        res.status(404).send(err).end();
    });
});

router.get('/attendence',authenticateToken,getStudentData,(req, res) => {
    res.render('index', { title: "Attendence", path: "attendence", js: "attendence.js",data:""});
});

router.get('/register', (req, res) => {
    res.render('index', { title: "Registration", path: "register", js: "register.js" });
});

router.get('/error',(req,res)=>{
    res.render('index',{title:"page not found",path:"error",js:""});
});

router.get('/logout',(req,res)=>{
    let token = req.cookies['accessToken'];
    res.clearCookie('accessToken');
    res.redirect('/login');
});



//to save data in database
router.post('/loginData',(req,res)=>{
    if(!req.body.username || !req.body.password){
        return res.status(400).send("required field can not be empty").end();
    }else{
        users.findOne({"email":req.body.username,"password":req.body.password })
        .then((data) =>{
            if(data){
                id = data._id;
                const username = req.body.username;
                const user = {email:username};
                const option = {expiresIn:"90000000"};
                const accessToken = jwtr.sign(user,process.env.ACCESS_TOKEN_SECRET,option);
                res.cookie('accessToken', accessToken);
                return res.redirect('/home');
            }else{
                res.status(500).send("incorrect email id or password").end();
            }
        }).catch((err)=>{
            res.send(err);
        });
    }
});

//to delete student data from database
router.get('/deleteData/:id',(req,res)=>{
    let id = req.params.id;
    students.remove({_id:id})
    .then((data)=>{
        res.redirect("/attendence");
    }).catch((err)=>{
        res.status(503).send(err.message).end();
    });
});


// middleware functions
function authenticateToken(req,res,next){
    const token = req.cookies['accessToken'];
    if(token == null){
        return res.status(401).send("Don't have Access to this page").end();
    }
    jwtr.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,result)=>{
        if(err){
            return res.status(403).send("Token is not verify").end();
        }
        req.user = result;
        next();
    });  
}



function getStudentData(req,res,next){
    if(req.path == '/attendence'){
        students.find({})
        .then((data)=>{
            res.render('index', { title: "Attendence", path: "attendence", js: "attendence.js",data:data});
        }).catch((err)=>{
            res.status(500).send(err.message).end();
        });
    }
}

router.get('/addStudentForm/:id',(req,res)=>{
    students.find({_id:req.params.id})
    .then((data)=>{
        res.render('index',{title:"Add Student",path:"addStudentForm",js:"addStudent.js",data:data});
    }).catch((err)=>{
        console.log(err.message);
    });
});

// add student form 
router.get('/addStudentForm',(req,res)=>{
    res.render('index',{title:"Add Student",path:"addStudentForm",js:"addStudent.js",data:""});
});


// save student details
router.post('/addData',(req,res)=>{ 
        let student = new students({name:req.body.name, attendence:req.body.attendence});
        student.save()
        .then((data)=>{
           res.redirect('/attendence');
        })
        .catch((err)=>{
            res.status(500).send(err.message).end();
        });
});


//update student data from database
router.post('/addData/:id',(req,res)=>{
    students.updateOne({_id:req.params.id},{name:req.body.name,attendence:req.body.attendence})
    .then((data)=>{
        res.redirect('/attendence');
    }).catch((err)=>{
        console.log(err);
    })
  
});



// add user details 
router.post('/registerData', (req, res) => {
    if((!req.body.name) || (!req.body.email) || (!req.body.password) || (!req.body.c_password) || (!req.body.address) || (!req.body.qualification) || (!req.body.department)){
        return res.status(400).send("required field can not be empty").end();
    }else{ 
        let user = new users({
            name:req.body.name ,
            email:req.body.email,
            password:req.body.password,
            confrimPassword:req.body.c_password,
            address:req.body.address,
            qualification:req.body.qualification,
            department:req.body.department
        });
        user.save()
        .then((data)=>{
            return res.redirect('/login');
        }).catch((err)=>{
            res.status(500).send(err.message).end();
        });
    }
});


// page not found 
router.get('*', function(req, res) {
    res.redirect('/error');
});

module.exports = router;