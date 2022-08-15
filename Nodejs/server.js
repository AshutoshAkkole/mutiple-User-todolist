require("dotenv").config()
const express = require("express");
const db = require("./database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();

const sessionStore = MongoStore.create({
    mongoUrl:process.env.URL
})

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}))
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.secret,
    resave:false,
    saveUninitialized:false,
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24,
    }
}))

app.use(passport.initialize());
app.use(passport.session());
// app.use((req,res,next)=>{
//     console.log(req.session)
//     console.log("\n",req.user)
// })

passport.use(db.collection.createStrategy());

passport.serializeUser(db.collection.serializeUser());
passport.deserializeUser(db.collection.deserializeUser());


app.get("/",(req,res)=>{
    if(req.isAuthenticated())
    {
        console.log("sent 1")
        res.send(true);
    }
    else{
        console.log("sent 0")
        res.send(false);
    }
})



app.post("/register", (req, response) => {
    console.log(req.body)
    db.collection.register({username:req.body.username},req.body.password,function(err,res){
        if(err)
        {
            console.log("some error cannot register\n",err);
            // response.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                response.redirect("/");
            })
        }
    })
});

app.get("/logout",(req,res)=>{
    req.logOut(function(err){
        if(err)
        {
            console.log("error in logout\n",err);
        }
        else{
            console.log("logged out successfully");
            res.redirect("/");
        }
    })
})



app.post("/",(req,res)=>{
    const user = new db.collection({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user,function(err){
        if(err)
        {
            console.log("Error in Authentication\n",err);
        }else{
            console.log("verified\n",req.body)
            passport.authenticate("local")(req,res,function(){
                console.log("user authentiacted");
                res.redirect("/");
            })
        }
    })
})

app.listen(3001,function(){
    console.log("server started at 3001");
})