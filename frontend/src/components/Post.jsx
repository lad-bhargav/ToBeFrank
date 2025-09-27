import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function Post({id,profilepic,username,contentText,contentImg}){
    const currUser = localStorage.getItem("username");
    const [userId,setUserId] = useState("");

    useEffect(()=>{
        getUserProfile();
    },[]);

    const navigate = useNavigate();
    const deletePost = async() => {
        const deletePost = await axios.delete("http://localhost:8080/delete",{
            data : {id : id},
        });
        if(deletePost.data.message === "deleted"){
            navigate("/myposts");
        }else{
            alert("Problem in deleting the post");
        }
    }

    const getUserProfile = async() => {
        const userProfile = await axios.post("http://localhost:8080/user",{
            username,
        });
        setUserId(userProfile.data._id);
    }

    const userProfile = () => {
        if(userId){
            navigate(`/user/${userId}`);
        }else{
            alert("some issue with userID");
        }
    }

    const editPost = () => {
        navigate(`/post/edit/${id}`);
    }

    return(
        <div className="postCard h-auto w-full max-w-md bg-blue-50 rounded-md p-5 shadow-xl mt-5">
            <div className="top w-full flex items-center gap-2">
                <div className='w-[50%] flex items-center gap-2'>
                    <div className="h-[45px] w-[45px] overflow-hidden text-center rounded-full"><img src={profilepic} alt="?" onClick={userProfile} className="h-full w-full bg-white object-cover cursor-pointer"/></div>
                    <p className="font-semibold text-lg cursor-pointer" onClick={userProfile}>{username}</p>
                </div>
                <div className='w-[50%] flex gap-5'>
                    {
                        username === currUser ? <button className=" text-blue-600 h-7 rounded cursor-pointer w-12 bg-blue-200 hover:bg-blue-300 ml-10" onClick={editPost}>edit</button> : <div></div>
                    }
                    {
                        username === currUser ? <button className=" text-red-600 h-7 rounded cursor-pointer w-10 bg-red-200 hover:bg-red-300" onClick={deletePost}><DeleteIcon/></button> : <div></div>
                    }
                </div>
            </div>
            <div className="remain w-full flex flex-col gap-2 mt-2">
                <p className="text-md font-normal">{contentText}</p>
                <div className="w-full overflow-hidden rounded">
                    <img src={contentImg} alt="no image" className='h-auto w-full object-cover'/>
                </div>
            </div>
        </div>
    );
}