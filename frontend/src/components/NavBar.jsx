import { useEffect, useState } from "react";
import logo from "../assets/tbflogo.png";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from "react-router-dom";
export default function NavBar(){
    const [isLogin,setIsLogin] = useState(false);
    const navigate = useNavigate();

    const home = () =>{
        navigate("/home");
    }

    const login = () => {
        navigate("/login");
    }

    const signup = () => {
        navigate("/signup");
    }

    useEffect(()=>{
        if(localStorage.getItem("email") != undefined){
            setIsLogin(true);
        }
    },[isLogin]);

    return(
        <div className="h-full w-[50vh] flex flex-col items-center fixed shadow-sm bg-white">
            <div className="logo w-full h-[15%] flex justify-center items-center">
                <img className="h-9 object-cover cursor-pointer" src={logo} alt="ToBeFrank" onClick={home}/>
            </div>
            <div className="w-full h-[70%] flex flex-col justify-center items-center gap-10">
                <p className="textdz flex items-center gap-2" onClick={home}><HomeIcon fontSize="large"/>Home</p>
                <p className="textdz pl-1 flex items-center gap-1"><SearchIcon fontSize="large"/>Explore</p>
                <p className="textdz pl-3 flex items-center gap-1"><EmailIcon fontSize="large"/>MyPosts</p>
                <button className="h-10 text-white cursor-pointer text-lg rounded-4xl font-semibold w-25 bg-gradient-to-l from-violet-700 to-violet-500">Create</button>
            </div>
            {
                isLogin ? (
                    <div className="user w-full h-[15%] bg-black flex justify-center items-center">
                        <p className="text-2xl font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600" onClick={()=> navigate("/profile")}>{localStorage.getItem("username")}</p>
                    </div>
                ) : (
                    <div className="gap-3 h-full w-[15%] flex justify-center items-center">
                        <button className="h-10 text-white shadow-md cursor-pointer text-lg rounded font-semibold w-20 bg-gradient-to-b from-violet-700 to-violet-500" onClick={login}>Login</button>
                        <button className="h-10 text-white shadow-md cursor-pointer text-lg rounded font-semibold w-20 bg-gradient-to-b from-violet-700 to-violet-500" onClick={signup}>signup</button>
                    </div>
                )
            }
        </div>
    );
}