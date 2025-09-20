const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/tobefrank";
const User = require("./models/User.js");
const Post = require("./models/Post.js");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}));

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected to DB");
}).catch(e => console.log(e));

app.get("/",(req,res)=>{
    res.send("working");
});

app.post("/signup",async(req,res)=>{
    try{
        let {email,username,password} = req.body;
        const newUser = new User({
            email : email,
            username : username,
            password : password,
        });
        await newUser.save();
        res.json({
            "message" : "signuped",
        })
    }catch(err){
        res.status(500).json({error : err.message});
    }

});

app.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    const user = await User.find({
        "email" : email,
    });
    if(user.length == 0){
        res.json({
            "message" : "Invalid Email",
        });
    }

    if(user[0].password == password){
        res.json({
            "message" : "loginok",
            "username" : user[0].username,
        });
    }else{
        res.json({
            "message" : "Invalid Password",
        });
    }
});

app.post("/profile",async(req,res)=>{
    try{
        const {email} = req.body;
        const profile = await User.findOne({
            "email" : email,
        });
        res.json({
            "profile" : profile,
        });
    }catch(err){
        res.status(500).json({error : err.message});
    }
});

app.post("/profile/edit",async(req,res)=>{
    try{
        const {email,username,password,profilepic} = req.body;
        const user = await User.findOneAndUpdate({
            "email" : email,
        },{
            "username" : username,
            "password" : password,
            "profilepic" : profilepic,
        });
        console.log(user);
        res.json({
        "message" : "profileUpdated",
        })
    }catch(err){
        res.status(500).json({error : err.message});
    }
});

app.get("/home",async(req,res)=>{
    try{
        const allPosts = await Post.find({});
        res.json(allPosts);
    }catch(err){
        res.status(500).json({error : err.message});
    }
})

app.listen(8080,()=>{
    console.log(`app is listing at port 8080`);
})