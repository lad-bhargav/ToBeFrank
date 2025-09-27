import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Post from "../components/Post";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

export default function TbfUsersProfile(){
    const {id} = useParams();
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[profilepic,setProfilePic] = useState("");
    const[bio,setBio] = useState("");
    const[followers,setFollowers] = useState(0);
    const[followings,setFollowings] = useState(0);
    const[profilePosts,setProfilePosts] = useState([]);

    const currUser = localStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(()=>{
        getUserDetails();
    },[id]);

    useEffect(()=>{
        getUserPosts();
    },[email]);

    const getUserDetails = async() => {
        const userDetails = await axios.get(`http://localhost:8080/user/${id}`);
        setUsername(userDetails.data.username);
        setBio(userDetails.data.bio);
        setProfilePic(userDetails.data.profilepic);
        setEmail(userDetails.data.email);
        setFollowings(userDetails.data.followings || 0);
    }

    const addFollowing = async() => {
        const emailLocal = localStorage.getItem("email");
        const plusUserFollowing = await axios.post("http://localhost:8080/plusfollowing",{
            "email" : emailLocal,
        });
        console.log(plusUserFollowing.data.followings);
        setFollowings(plusUserFollowing.data.followings);
        navigate(`/home`);
    }

    const getUserPosts = async() => {
        try{
            const usersPosts = await axios.post("http://localhost:8080/myposts",{
                "email" : email,
            });
            setProfilePosts(usersPosts.data);
        }catch(err){
            alert("some problem");
            console.log(err);
        }
    }

    return(
        <div className="min-h-screen max-w-screen justify-center items-center pl-120 bg-gradient-to-l from-fuchsia-300 to-violet-300">
            <div className="profilecard min-h-screen max-w-[80%] flex flex-col items-center shadow-lg bg-gradient-to-l from-fuchsia-300 to-violet-300">
                <div className="top h-[32%] w-full bg-gradient-to-r ">
                    <div className="h-[180px] w-[180px] ml-10 mt-2 overflow-hidden rounded-full">
                        <img src={profilepic} alt="no pic" className="h-full w-full object-cover"/>
                    </div>
                    <div className="h-full w-[65%] flex flex-col justify-center">
                        <div className="h-[80%] w-full flex flex-col justify-center">
                            <p className="font-bold text-2xl ml-17 mt-10">{username}</p>
                            <p className="font-normal text-md ml-17"><i>{bio}</i></p> 
                            {
                                currUser !== username ? <button className="h-10 text-white cursor-pointer text-lg rounded-4xl font-semibold w-25 hover:bg-violet-600 ml-17 mt-5 bg-violet-700" onClick={addFollowing}>Follow</button> : <button className="h-10 text-white cursor-pointer text-lg rounded-4xl font-semibold w-28 hover:bg-violet-600 ml-17 mt-5 bg-violet-700" onClick={()=> navigate("/profile/edit")}>edit profile</button>
                            }
                        </div>
                        <div className="h-[20%] w-full flex justify-center">
                            <pre className="flex mt-5 h-full justify-center items-center w-[50%]"><p className="font-semibold text-md">followers </p>{followers}</pre>
                            <pre className="flex mt-5 h-ful w-[50%] justify-center items-center"><p className="font-semibold text-md">following </p>{followings}</pre>
                        </div>
                    </div>
                </div>
                <div className="bottom min-h-[68%] max-w-full">
                    <hr className="w-[600px]"/>
                    <p className="font-bold text-2xl mt-5 ml-2">{username}'s posts</p>
                    {
                        profilePosts.length > 0 ? (
                            profilePosts.map((post)=>(
                                <div>
                                    <Post
                                        id = {post._id}
                                        profilepic={post.profilepic}
                                        username={post.username}
                                        contentText={post.content.text}
                                        contentImg={post.content.img}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="min-h-[68%] max-w-screen text-center content-center">
                                <div className="mt-10"><InboxOutlinedIcon sx={{ fontSize: 60, color: "black" }} /></div>
                                <p className="text-4xl text-center font-bold">No Posts found</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}