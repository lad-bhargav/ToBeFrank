import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function MyPosts(){
    const [userPosts,setUserPosts] = useState([]);

    useEffect(()=>{
        getAllUserPosts();
    },[]);

    const getAllUserPosts = async() => {
        try{
            const email = localStorage.getItem("email");
            const allUserPosts = await axios.post("http://localhost:8080/myposts",{
                "email" : email,
            });
            setUserPosts(allUserPosts.data);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="h-screen w-screen flex bg-gradient-to-l from-fuchsia-300 to-violet-300">
            <div className="left h-screen w-[30%]"></div>
            <div className="right h-screen w-[70%] flex flex-wrap gap-5">
                {
                userPosts.length > 0 ? (
                    userPosts.map((post)=>(
                        <div>
                            <Post
                                id={post._id}
                                profilepic={post.profilepic}
                                username={post.username}
                                contentText={post.content.text}
                                contentImg={post.content.img}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-4xl text-center font-bold">No Posts found</p>
                )
            }
            </div>
        </div>
    );
}