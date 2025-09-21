import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Post from "../components/Post";

export default function Home(){
    const [posts,setPosts] = useState([]);
    
    useEffect(()=>{
        getAllPosts();
    },[]);

    const getAllPosts = async()=>{
        try{
            const allPosts = await axios.get("http://localhost:8080/home");
            setPosts(allPosts.data);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="min-h-screen pl-40 bg-gradient-to-l from-fuchsia-300 to-violet-300 max-w-screen flex flex-col justify-center items-center">
            {
                posts.map((post,idx)=>(
                    <Post
                        id = {post._id}
                        profilepic = {post.profilepic}
                        username = {post.username}
                        contentText = {post.content.text}
                        contentImg = {post.content.img}                    
                    />
                ))
            }
        </div>
    );
}