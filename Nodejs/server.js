require("dotenv").config()
const express = require("express");
const db = require("./database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

const sessionStore = MongoStore.create({
    mongoUrl:process.env.URL
})

app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.secret,
    resave:false,
    saveUninitialized:false,
    store:sessionStore,
    cookie:{
        maxAge:1000*10,
    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(db.collection.createStrategy());

passport.serializeUser(db.collection.serializeUser());
passport.deserializeUser(db.collection.deserializeUser());



app.get("/",(req,res)=>{
    const user = db.collection({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user,function(err){
        if(err)
        {
            console.log("Error in Authentication\n",err);
        }else{
            passport.authenticate("local")(req,res,function(){
                console.log("user authentiacted");
                res.send("authencated");
            })
        }
    })
    // if(req.session.visit)
    // {
    //     req.session.visit++;
    //     res.send(`In home ${req.session.visit} time route`);
    // }else{
    //     req.session.visit=1;
    //     res.send(`In home 1 time route`);
    // }
})

app.listen(3000,function(){
    console.log("server started at 3000");
})