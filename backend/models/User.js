const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
    },
    password : {
        type : String,
    },
    email : {
        type : String,
    },
    profilepic : {
        type : String,
    },
    bio : {
        type : String,
    },
    followers : {
        type : Number,
    },
    followings : {
        type : Number,
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;