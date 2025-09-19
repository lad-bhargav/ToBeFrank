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

app.listen(8080,()=>{
    console.log(`app is listing at port 8080`);
})