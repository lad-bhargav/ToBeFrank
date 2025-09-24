import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Post from "../components/Post";
import SearchIcon from '@mui/icons-material/Search';

export default function Explore(){
    const [posts,setPosts] = useState([]);
    const lUsername = localStorage.getItem("username");
        
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
        <div className="h-screen max-w-screen bg-gradient-to-l from-fuchsia-300 to-violet-300">
            <div className="top h-[35%] w-full flex justify-center items-center pl-70">
                <div className="h-13 w-120 rounded flex justify-center items-center">
                    <input type="text" placeholder="find your friends here..." className="h-12 shadow-lg w-105 p-5 bg-gray-200 rounded-l-full"/>
                    <div className=" bg-violet-950 shadow-l h-12 w-13 rounded-r-full text-white flex justify-center items-center">
                        <SearchIcon fontSize="large"/>
                    </div>
                </div>
            </div>
            <div className="bottom w-full max-w-screen flex bg-gradient-to-l from-fuchsia-300 to-violet-300">
            <div className="left w-[30%]"></div>
            <div className="right w-[70%] flex flex-col items-center mr-24">
            {posts
                .filter(post => post.username !== lUsername)
                .map((post, idx) => (
                    <Post
                        key={idx}
                        id={post._id}
                        profilepic={post.profilepic}
                        username={post.username}
                        contentText={post.content.text}
                        contentImg={post.content.img}
                    />
                ))
            }
        </div>
    </div>
</div>

    );
}