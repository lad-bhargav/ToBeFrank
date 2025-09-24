import { useEffect, useState } from "react";
import logo from "../assets/tbflogo.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CreatePost(){
    const [contentText,setContentText] = useState("");
    const [contentImg,setContentImg] = useState("");
    const [username,setUsername] = useState("");
    const [profilepic,setProfilePic] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        getProfile();
    },[]);

    const getProfile = async() => {
        const Email = localStorage.getItem("email");
        const userProfile = await axios.post("http://localhost:8080/profile",{
            "email" : Email,
        });
        console.log(userProfile.data.profile.profilepic);
        setUsername(userProfile.data.profile.username);
        setProfilePic(userProfile.data.profile.profilepic);
    }

    const addPost = async() => {
        const email = localStorage.getItem("email");
        const post = await axios.post("http://localhost:8080/create",{
            "email" : email,
            "username" : username,
            "profilepic" : profilepic,
            "contentText" : contentText,
            "contentImg" : contentImg,
        });
        if(post.data.message == "postAdded"){
            console.log(post);
            navigate("/home");
        }else{
            alert("Having problem to create Post");
        }
    }
    return(
        <div className="h-screen w-screen flex justify-center pl-40 items-center bg-gradient-to-l from-fuchsia-300 to-violet-300">
            <div className="form mt-5 h-[70%] w-[50%] text-center p-5 flex justify-center items-center flex-col rounded-xl shadow-lg gap-2 bg-gradient-to-l from-fuchsia-200 to-violet-200">
                <div className="logo w-full h-[20%] flex justify-center items-center">
                    <img className="h-9 object-cover" src={logo} alt="ToBeFrank"/>
                </div>
                <textarea type="text" placeholder="write content here..." className="min-w-[400px] min-h-[150px] shadow-md bg-gray-50 rounded p-3 mt-3" name="contentText" value={contentText} onChange={(e) => setContentText(e.target.value)}/>
                <input type="text" placeholder="image url you want to post..." className="h-10 w-100 shadow-md bg-gray-50 rounded p-3 mt-3" name="contentImg" value={contentImg} onChange={(e)=>setContentImg(e.target.value)}/>
                <button className="mt-7 h-11 text-white shadow-md cursor-pointer text-lg rounded font-semibold w-25 bg-gradient-to-l from-violet-700 to-violet-500" onClick={addPost}>Post</button>
            </div>
        </div>
    );
}