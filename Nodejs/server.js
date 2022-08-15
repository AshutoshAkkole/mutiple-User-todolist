require("dotenv").config()
const express = require("express");
const db = require("./database");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();

const sessionStore = MongoStore.create({
    mongoUrl: process.env.URL
})

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

app.use(passport.initialize());
app.use(passport.session());
// app.use((req,res,next)=>{
//     console.log(req.session)
//     console.log("\n",req.user)
// })

passport.use(db.userCollection.createStrategy());

passport.serializeUser(db.userCollection.serializeUser());
passport.deserializeUser(db.userCollection.deserializeUser());


app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        // console.log(req.user)
        console.log("sent 1")
        res.send(true);
    }
    else {
        console.log("sent 0")
        res.send(false);
    }
})

app.get("/getCardIds", (req, res) => {

    if (req.isAuthenticated()) {
        res.send(req.user.cardId);
    }
    else {
        res.send(false)
    }

})

app.post("/updateTaskStatus",(req,res)=>{

    if(req.isAuthenticated())
    {
        console.log(req.body)
        const taskId=req.body.taskId;
        const cardId=req.body.cardId;
        const doneStatus = req.body.doneStatus;
        const whoUpdatedLast = req.user.username;

        db.cardCollection.updateOne({"_id":cardId,'tasks._id':taskId},{$set:{'tasks.$.doneStatus':doneStatus,'tasks.$.whoUpdatedLast':whoUpdatedLast}},(err)=>{
            if(err)
            {
                console.log("Error in updating the status of task\n",err);
            }
            else{
                res.send("done");
                console.log("updated the status of task");
            }
        })
    }
    else{
        res.send(false)
    }

})

app.post("/getOneCard", (req, res) => {

    if (req.isAuthenticated())
    {
        const id = req.body.id
        db.cardCollection.findById(id, function (err, data) {
            if (err) {
                console.log("err in getting card id:", id, "\nerror\n", err);
            }
            else {
                res.send(data)
                console.log("card sent\n");
            }
        })
    }
    else
    {
    res.send(false);
    }
})

app.post("/creatCard", (req, res) => {
    if (req.isAuthenticated()) {
        const card = new db.cardCollection({
            title: req.body.title,
            whoCreated: req.user.username,
            task: []
        })

        card.save(function (err, data) {
            if (err) {
                console.log("error in saving\n", err)
            }
            else {
                const cardId = data.id;
                const userShareArray = req.body.userShare.split(" ");
                userShareArray.push(req.user.username);

                userShareArray.forEach(function (user) {
                    db.userCollection.updateOne({ username: user }, { $push: { "cardId": cardId } }, function (err) {
                        if (err) {
                            console.log("error in sharing to user\nuser:", user, "\nerror:", err);
                        }
                    })
                })

                res.send("done");
            }
        })
    }
    else {
        res.send(false);
    }
})

app.post("/addTask", (req, res) => {
    if (req.isAuthenticated()) {
        const id = req.body.id;
        const data = {
            data: req.body.data,
            doneStatus: 0,
            whoUpdatedLast: req.user.username,
            whoCreated: req.user.username,
        }

        db.cardCollection.findByIdAndUpdate(id, { $push: { "tasks": data } }, function (err) {
            if (err) {
                console.log("opps some error in adding task\n", err)
            }
            else {
                console.log("task added successfully\n")
                res.send("done");
            }
        })
    }
    else {
        res.send(false)
    }
})



app.post("/register", (req, response) => {
    // console.log(req.body)
    db.userCollection.register({ username: req.body.username }, req.body.password, function (err, res) {
        if (err) {
            console.log("some error cannot register\n", err);
            // response.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                response.redirect("/");
            })
        }
    })
});

app.get("/logout", (req, res) => {
    req.logOut(function (err) {
        if (err) {
            console.log("error in logout\n", err);
        }
        else {
            console.log("logged out successfully");
            res.redirect("/");
        }
    })
})



app.post("/", (req, res) => {

    const user = new db.userCollection({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function (err) {
        if (err) {
            console.log("Error in Authentication\n", err);
        } else {
            // console.log("verified\n",req.body)
            passport.authenticate("local")(req, res, function () {
                // console.log("user authentiacted");
                res.redirect("/");
            })
        }
    })
})

app.listen(3001, function () {
    console.log("server started at 3001");
})