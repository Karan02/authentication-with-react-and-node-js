const User = require("../models/user")
const jwt = require("jwt-simple")
const config = require("../config")

function tokenForUser(user){
    const timeStamp = new Date().getTime()
    return jwt.encode({sub:user.id,iat:timeStamp},config.secret)
}

exports.signup = function(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password)
        return res.status(422).send({error:"Must provide email and password"})
    User.findOne({email:email},function(err,existingUser){
      if(err){return next(err)}
      if(existingUser){return res.status(422).send({error:"Email already exist"})}
      const user = new User({email:email,password:password})
      user.save(function(err){
          if(err){return next(err)}
          res.json({token:tokenForUser(user)});
      });  
    })
}

exports.signin = function(req,res,next){
 //User already have their email and password auth'd
 //we just need to give them token  
 //req.user is made for us by passport lib 
 console.log("about 1")
    res.send({token:tokenForUser(req.user)})
}