const mongoose = require("mongoose");
const inData = require("./data.js");
const Post = require("../models/Post.js");
const MONGO_URL = 'mongodb://127.0.0.1:27017/tobefrank';

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected to DB");
}).catch(e => console.log(e));

const initDB = async() => {
    await Post.deleteMany({});
    await Post.insertMany(inData.data);
    console.log("data is inited");
}
initDB();