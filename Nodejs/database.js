require("dotenv").config()
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect(process.env.URL,{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    cardId:[String]
})

const cardSchema = new mongoose.Schema({
    title:String,
    whoCreated:String,
    tasks:[{
        data:String,
        doneStatus:Number,
        whoUpdatedLast:String,
        whoCreated:String,
    }]
})

userSchema.plugin(passportLocalMongoose);

const userCollection = mongoose.model("user",userSchema);

const cardCollection = mongoose.model("card",cardSchema);

module.exports = {mongoose,userCollection,cardCollection};