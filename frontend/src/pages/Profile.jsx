import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Profile(){
    const [profile,setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        getProfile();
    },[]);

    const editProfile = () => {
        navigate("/profile/edit");
    }

    const LogOut = () => {
        const username = localStorage.removeItem("username");
        const email = localStorage.removeItem("email");
        navigate("/login");
    }

    const getProfile = async() => {
        const Email = localStorage.getItem("email");
        if(!Email){
            navigate("/login");
        }
        const userProfile = await axios.post("http://localhost:8080/profile",{
            "email" : Email,
        });
        console.log(userProfile.data.profile);
        setProfile(userProfile.data.profile);
    }

    return(
        <div className="flex h-screen w-screen justify-center items-center pl-40 bg-gradient-to-l from-fuchsia-300 to-violet-300">
            <div className="card h-[70%] w-[50%] rounded-xl mt-5 flex  items-center flex-col gap-3 shadow-lg">
                <div className="h-[32%] w-full rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-violet-500 to-pink-600 flex justify-center items-center">
                    <div className="h-[150px] w-[150px] overflow-hidden mt-35 text-center rounded-full shadow-lg">
                    <img src={profile.profilepic} alt="no pic" className="h-full w-full bg-white object-cover"/>
                    </div>
                </div>
                <div className="h-[30%] w-full mt-17 text-center flex flex-col justify-center items-center">
                    <p className="text-2xl font-bold">{profile.username}</p>
                    <p className="text-md"><i>{profile.bio}</i></p>
                </div>
                <div className="flex gap-5">
                    <button onClick={editProfile} className="h-10 text-white shadow-md cursor-pointer text-lg rounded font-normal w-20 hover:bg-violet-700 bg-violet-800">Edit</button>
                    <button onClick={LogOut} className="h-10 shadow-md cursor-pointer text-lg rounded font-semibold w-20 bg-red-200 hover:border-[0.5px] border-red-600 text-red-600">Log-out</button>
                </div>
            </div>
        </div>
    );
}