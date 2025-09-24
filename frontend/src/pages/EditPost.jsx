import { useEffect, useState } from "react";
import logo from "../assets/tbflogo.png";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditPost(){
    const [contentText,setContentText] = useState("");
    const [contentImg,setContentImg] = useState("");
    
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getPost();
    },[]);

    const getPost = async() => {
        const post = await axios.get(`http://localhost:8080/post/${id}`);
        setContentText(post.data.content.text);
        setContentImg(post.data.content.img);
    }

    const updatePost = async() => {
        const editPost = await axios.put(`http://localhost:8080/post/edit/${id}`,{
            "contentText" : contentText,
            "contentImg" : contentImg,
        });
        if(editPost.data.message === "updated"){
            console.log(editPost);
            navigate("/myposts");
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
                <button className="mt-7 h-11 text-white shadow-md cursor-pointer text-lg rounded font-semibold w-25 bg-gradient-to-l from-violet-700 to-violet-500" onClick={updatePost}>edit post</button>
            </div>
        </div>
    );
}