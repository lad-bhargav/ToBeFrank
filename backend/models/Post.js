const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const postSchema = new Schema({
    email : {
        type : String,
    },
    username : {
        type : String,
    },
    profilepic : {
        type : String,
    },
    content : {
        text : {
            type : String,
        },
        img : {
            type : String,
        }
    }
});

const Post = moongoose.model("Post",postSchema);
module.exports = Post;