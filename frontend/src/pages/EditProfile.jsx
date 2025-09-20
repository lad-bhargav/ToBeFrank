import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function EditProfile(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [profilepic,setProfilepic] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        getProfile();
    },[]);

    const getProfile = async() => {
        const Email = localStorage.getItem("email");
        const userProfile = await axios.post("http://localhost:8080/profile",{
            "email" : Email,
        });
        setUsername(userProfile.data.profile.username);
        setPassword(userProfile.data.profile.password);
        setProfilepic(userProfile.data.profile.profilepic);
    }

    const updateProfile = async() => {
        const email = localStorage.getItem("email");
        const newProfile = await axios.post("http://localhost:8080/profile/edit",{
            "email" : email,
            "username" : username,
            "password" : password,
            "profilepic" : profilepic,
        });
        if(newProfile.data.message === "profileUpdated"){
            localStorage.setItem("username",username);
            navigate("/profile");
        }else{
            alert("Edit Profile Failed");
        }
    }
    return(
        <div className="flex h-screen w-screen justify-center items-center ">
            <div className="card p-5 h-[70%] w-[50%] bg-gradient-to-l from-fuchsia-300 to-violet-300 rounded-xl mt-5 flex  items-center flex-col gap-3 shadow-lg">
                <h1 className="text-3xl font-bold mt-5">Edit Profile</h1>
                <div className="h-[50%] w-full flex flex-col items-center mt-5">
                    <input type="text" placeholder="username" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="password" placeholder="password" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="text" placeholder="profile pic" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" name="profilepic" value={profilepic} onChange={(e)=>setProfilepic(e.target.value)}/>
                </div>
                <div className="h-[30%] w-full flex justify-center items-center">
                    <button className="h-10 text-white shadow-md cursor-pointer text-lg rounded font-semibold w-25 bg-gradient-to-l from-violet-700 to-violet-500" onClick={updateProfile}>Edit</button>
                </div>
            </div>
        </div>
    );
}