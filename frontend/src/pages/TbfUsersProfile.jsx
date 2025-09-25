import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TbfUsersProfile(){
    const {id} = useParams();
    const[username,setUsername] = useState("");
    const[profilepic,setProfilePic] = useState("");
    const[bio,setBio] = useState("");
    const[followers,setFollowers] = useState(0);
    const[followings,setFollowings] = useState(0);
    useEffect(()=>{
        getUserDetails();
    },[id]);

    const getUserDetails = async() => {
        const userDetails = await axios.get(`http://localhost:8080/user/${id}`);
        setUsername(userDetails.data.username);
        setBio(userDetails.data.bio);
        setProfilePic(userDetails.data.profilepic);
    }
    return(
        <div className="h-screen w-screen justify-center items-center pl-120 text-white bg-gray-100">
            <div className="profilecard h-screen w-[80%] flex flex-col items-center shadow-lg bg-gradient-to-l from-fuchsia-300 to-violet-300">
                <div className="h-[32%] w-full rounded-tl-xl rounded-tr-xl bg-gradient-to-r from-violet-500 to-pink-600 flex items-center">
                    <div className="h-[180px] w-[180px] ml-10 overflow-hidden rounded-full">
                        <img src={profilepic} alt="no pic" className="h-full w-full object-cover"/>
                    </div>
                    <div className="h-full w-[65%] flex flex-col justify-center">
                        <div className="h-[80%] w-full flex flex-col justify-center">
                            <p className="font-bold text-2xl ml-17 mt-10">{username}</p>
                            <p className="font-normal text-md ml-17"><i>{bio}</i></p>
                        </div>
                        <div className="h-[20%] w-full flex justify-center">
                            <pre className="flex h-full justify-center items-center w-[50%]"><p className="font-semibold text-md">followers </p>{followers}</pre>
                            <pre className="flex h-ful w-[50%] justify-center items-center"><p className="font-semibold text-md">following </p>{followings}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}