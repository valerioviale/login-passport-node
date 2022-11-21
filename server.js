  const express = require('express');
  const passport = require('passport');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const PassportLocal = require('passport-local').Strategy;

  const app = express();
  
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser('a secret'));

app.use(session({
    secret: 'a secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done) {
    if(username === "q" & password === "q")
    return done(null,{ id: 1, name: "Valerio"});

    done(null, false);
}));

//serialization
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialization
passport.deserializeUser(function(id,done){
    done(null, {id: 1, name: "Valerio"})
})

app.set('view engine' , 'ejs');

  app.get("/", (req,res) => {
    // we start with welcome

    // or we send them back to login
    res.end("Hello");
  })

  app.get("/login", (req,res) => {
    // show login page
    res.render("login")
  });

  app.post("/login", passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect:"/login"
  }));
  
  app.listen(8080, ()=> console.log("server started"));