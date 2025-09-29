import { useState } from "react";
import logo from "../assets/tbflogo.png";
import { useNavigate } from "react-router-dom";
import axios from"axios";

export default function SignUp(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const login = () => {
        navigate("/login");
    }

    const onSubmitBtn = async(e) => {
        e.preventDefault();

        try{
            const signupAPI = await axios.post("http://localhost:8080/signup",{
                email,
                username,
                password,
            });
            if(signupAPI.data.message === "signuped"){
                navigate("/login",{replace : true});
            }else if(signupAPI.data.message === "signup-failed"){
                alert("fill details properly and try again");
            }
            else{
                alert("sign-up failed");
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="h-screen w-screen flex justify-center pl-40 items-center bg-gradient-to-l from-fuchsia-100 to-violet-200">
                <div className="card mt-5 h-[65%] w-[30%] text-center p-5 flex justify-center items-center flex-col rounded-xl shadow-lg gap-2 bg-gradient-to-r from-violet-300 to-violet-300">
                    <h1 className="text-3xl font-bold">Sign-Up</h1>
                    <input type="email" placeholder="email" name="email" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder="username" name="username" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="password" name="password" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="mt-7 h-10 text-white shadow-md cursor-pointer text-lg rounded font-semibold w-25 bg-gradient-to-l from-violet-700 to-violet-500" onClick={onSubmitBtn}>Sign-up</button>
                    <pre className="flex mt-5"><p>already have Account?</p><p className="cursor-pointer text-blue-600" onClick={login}>login</p></pre>
                </div>
            </div>
    );
}