const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/tobefrank";
const User = require("./models/User.js");
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

})

app.listen(8080,()=>{
    console.log(`app is listing at port 8080`);
})