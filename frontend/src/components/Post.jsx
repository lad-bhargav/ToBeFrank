import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Post({id,profilepic,username,contentText,contentImg}){
    const currUser = localStorage.getItem("username");
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

    const editPost = () => {
        navigate("/editpost");
    }

    return(
        <div className="postCard h-auto w-[60vh] bg-blue-50 rounded-md p-5 shadow-xl mt-7">
            <div className="top h-[15%] w-full flex items-center gap-2">
                <div className='h-full w-[50%] flex items-center gap-2'>
                    <div className="h-[45px] w-[45px] overflow-hidden text-center rounded-full"><img src={profilepic} alt="?" className="h-full w-full bg-white object-cover"/></div>
                    <p className="font-semibold text-lg">{username}</p>
                </div>
                <div className='h-full w-[50%] flex gap-5'>
                    {
                    username === currUser ? <button className=" text-blue-600 h-7 rounded cursor-pointer w-12 bg-blue-200 hover:bg-blue-300 ml-10" onClick={editPost}>edit</button> : <div></div>
                    }
                    {
                    username === currUser ? <button className=" text-red-600 h-7 rounded cursor-pointer w-10 bg-red-200 hover:bg-red-300" onClick={deletePost}><DeleteIcon/></button> : <div></div>
                    }
                </div>
            </div>
            <div className="remain h-[85%] w-full flex flex-col gap-2 mt-2">
                <p className="text-md font-normal">{contentText}</p>
                <div className="h-[80%] w-full bg-red-500">
                    <img src={contentImg} alt="no image" />
                </div>
            </div>
        </div>
    );
}