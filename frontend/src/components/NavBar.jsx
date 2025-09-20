import { useState } from "react";
import logo from "../assets/tbflogo.png";
import { useNavigate } from "react-router-dom";
export default function NavBar(){
    const [isLogin,setIsLogin] = useState(false);
    const navigate = useNavigate();

    const home = () =>{
        navigate("/");
    }

    const login = () => {
        navigate("/login");
    }

    const signup = () => {
        navigate("/signup");
    }

    return(
        <div className="h-[10vh] w-full flex items-center fixed shadow-sm bg-white">
            <div className="logo h-full w-[15%] flex justify-center items-center">
                <img className="h-9 object-cover cursor-pointer" src={logo} alt="ToBeFrank" onClick={home}/>
            </div>
            <div className="h-full w-[70%] flex justify-center items-center gap-5">
                <p className="textdz" onClick={home}>Home</p>
                <p className="textdz">Explore</p>
            </div>
            {
                isLogin ? (
                    <div className="user h-full w-[15%] flex justify-center items-center">
                        <p className="textdz">Profile</p>
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