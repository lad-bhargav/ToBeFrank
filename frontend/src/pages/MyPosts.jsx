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
        <div className="h-screen w-screen flex flex-row gap-5 justify-center pl-40 items-center bg-gradient-to-l from-fuchsia-100 to-violet-200">
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
    );
}