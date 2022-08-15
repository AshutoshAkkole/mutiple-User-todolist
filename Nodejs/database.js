require("dotenv").config()
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect(process.env.URL,{useNewUrlParser:true});

const schema = new mongoose.Schema({
    username:String,
    password:String
})

schema.plugin(passportLocalMongoose);

const collection = mongoose.model("user",schema);

module.exports = {mongoose,collection}