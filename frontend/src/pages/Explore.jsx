import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Post from "../components/Post";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function Explore(){
    const [posts,setPosts] = useState([]);
    const [query,setQuery] = useState("");
    const [results,setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async(e) => {
        const value = e.target.value;
        setQuery(value);

        if(value.length > 1){
            const res = await axios.get(`http://localhost:8080/search?q=${value}`);
            console.log(res.data);
            setResults(res.data);
        }else{
            setResults([]);
        }
    }

    const visitUser = (id) => {
        if(id){
            navigate(`/user/${id}`);
        }else{
            alert("Having issue to get profile");
        }
    }

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
                <div className="h-13 w-120 rounded flex justify-center items-center relative">
                    <input type="text" onChange={handleSearch} placeholder="find your friends here..." className="h-12 shadow-lg w-105 p-5 bg-white rounded-l-full"/>
                    <div className=" bg-violet-950 shadow-l h-12 w-13 rounded-r-full text-white flex justify-center items-center">
                        <SearchIcon fontSize="large"/>
                    </div>
                    {results.length > 0 && (
                        <ul className="absolute top-14 left-0 w-117 bg-white rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
                        {results.map((user) => (
                            <li key={user._id} onClick={()=>visitUser(user._id)} className="flex items-center gap-3 px-4 py-2 hover:bg-violet-50 cursor-pointer transition">
                                <img src={user.profilepic} alt="no pic" className="w-8 h-8 rounded-full" />
                                <span>{user.username}</span>
                            </li>
                    ))}
                </ul>
            )}
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