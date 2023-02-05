var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const {body, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/Users")
const Todo = require("../models/Todos")
const passport  = require("passport-jwt")
const validateToken = require("../auth/validation.js")



router.use(express.json());
router.use(bodyParser.json())
/* GET users listing. */
/* router.get('/', (req, res, next) => {
  //res.send("terve")
  res.render("register")
}); */


router.get('/private', validateToken, (req, res, next) => {
  
  res.send(req.email.email)
  
});

//Login
router.post('/user/login', 
  body("email"),
  body("password"),
(req, res, next) => {
  User.findOne({email: req.body.email},(err, user)=>{
    if(err){
      throw err
    }
    if(!user){
      return res.send("Invalid credentials");
    } else {

      bcrypt.compare(req.body.password, user.password,(err,match)=>{
        if(err){
          throw err
        }if(!match){
          //res.send("Invalid credentials")
          return res.send("Invalid credentials")
        }if(match){
          const tokenPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            tokenPayload,
            process.env.SECRET,
            {
              expiresIn: 120  
            },
            (err, token)=>{
              if(err) throw err;
               return res.send({success: true,token: token})
               
            }
          )
        }
      })
    }

  })

});

//Register /user/register
router.post("/user/register",
  body("email").isEmail(),
  body("password")
  .isStrongPassword()
  .withMessage("Password is not strong enough"),
(req, res, next) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    //console.log(errors.errors[0].msg)
    return res.send(errors.errors[0].msg)
  }

  User.findOne({email: req.body.email},(err, user) => {
    if(err) {
      throw err;
    };  
    if(user){
      //res.status(403).send("Email already in use");
      return res.send("Email already in use");
    }else {
      bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(req.body.password, salt, (err, hash)=>{
          if(err) throw err;
          User.create(
            {
              email: req.body.email,
              password: hash
            },(err,ok)=>{
              if(err) throw err;
              return res.send(ok)
              //return res.redirect("login.html")
            }
          );
        });
      });
    }
  });
});

//Todo
router.post('/todos', validateToken,body("items"),body("email"),(req, res, next) => {
  const userEmail = req.body.email

  Todo.findOne({user: User._id},(err, user) => {
    if(err) {
      throw err;
    };  
    if(user){
      console.log(user._id)
      Todo.insertMany(
        {
          items: req.body.items}, 
        (err , ok)=>{
        if(err) throw err;
        
        
        return res.send("ok")
      })
     
    }else {
      console.log(user.items)
      console.log(req.body.items)
      if(err) throw err;
      Todo.create(
        {user: user._id,
          items: req.body.items}, 
        (err , ok)=>{
        if(err) throw err;
          
          //console.log(ok._id)
        return res.send("ok")
      })
    }
  })
  
});

module.exports = router;
