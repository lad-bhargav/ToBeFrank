import { useState } from "react";
import logo from "../assets/tbflogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
    const navigate = useNavigate();
    const signup = () => {
        navigate("/signup");
    }

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onSubmitBtn = async(e) => {
        e.preventDefault();

        try{
            const loginAPI = await axios.post("http://localhost:8080/login",{
                email,
                password,
            });

            if(loginAPI.data.message === "loginok"){
                localStorage.setItem("email",email);
                localStorage.setItem("username",loginAPI.data.username);
                navigate("/home",{replace : true});
            }else{
                alert("Login Failed");
            }
        }catch(err){
            console.log(err);
            alert("Login Failed");
        }
    }

    return(
        <div className="h-screen w-screen flex bg-gradient-to-l from-fuchsia-100 to-violet-200">
            <div className="left h-[100%] w-[50%] flex flex-col justify-center items-center">
                <div className="h-20 w-full flex justify-center items-center">
                    <img src={logo} alt="ToBeFrank" className="h-20 object-cover"/>
                </div>
                <div>
                    <p className="font-semibold text-2xl bg-clip-text text-transparent bg-gradient-to-l from-violet-700 to-violet-500">Connect with World</p>
                </div>
            </div>
            <div className="right h-[100%] w-[50%] flex justify-center items-center">
                <div className="card mt-5 h-[65%] w-[50%] text-center p-5 flex justify-center items-center flex-col rounded-xl shadow-lg gap-2 bg-gradient-to-r from-violet-200 to-violet-300">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <input type="text" placeholder="email" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" value={email} name="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="password" className="h-10 w-65 shadow-md bg-gray-50 rounded p-2 mt-5" value={password} name="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="mt-7 h-10 text-white shadow-md cursor-pointer text-lg rounded font-semibold w-25 bg-gradient-to-l from-violet-700 to-violet-500" onClick={onSubmitBtn}>Login</button>
                    <pre className="flex mt-5"><p>Dont't have Account?</p><p className="cursor-pointer text-blue-600" onClick={signup}>signup</p></pre>
                </div>
            </div>
        </div>
    );
}