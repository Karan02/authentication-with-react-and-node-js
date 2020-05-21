const passport = require("passport")
const User = require("../models/user")
const config = require("../config")
//jwt strategy is to verify token for accessing api resource
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
// local strategy is to verify email and password and allow login
const LocalStrategy = require("passport-local")

const localOptions = {usernameField:"email"}
//create local strategy
const localLogin = new LocalStrategy(localOptions,function(email,password,done){
    //verify email and password, call done with the user
    // if it is correct email and password
    /// otherwise, call done with false
    User.findOne({email:email},function(err,user){
        if(err) return done(err)
        if(!user) return done(null,false)
        //compare passwords is "password" equal to user.password
        user.comparePassword(password,function(err,isMatch){
            if(err) return done(err)
            if(!isMatch) return done(null,false)
            return done(null,user)
        })
     })
})

//setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest:ExtractJwt.fromHeader("authorization"),
    secretOrKey:config.secret
}

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
    //see if user ID in payload exist in our DB
    //If it does, call "done" with that other
    //otherwise,call done without a user object
    
    User.findById(payload.sub,function(err,user){
        if(err) {
            return done(err,false) 
        }

        if(user){ 
            done(null,user)
        }
        else {
        done(null,false)
    }
    })
})
//tell passport to use this strategy

passport.use(jwtLogin)
passport.use(localLogin)