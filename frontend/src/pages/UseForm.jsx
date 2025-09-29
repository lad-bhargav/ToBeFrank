// import {useForm} from "react-hook-form";
// import React, { useEffect } from 'react'
// import axios from "axios";

// const UseForm = () => {
//     useEffect(()=>{
//         response();
//     },[])
//     const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()

//   const response = async () => {
//         const res = await axios.post("http://localhost:8080/signup",{})
//         console.log(res);     
//   }

//   return (
//     <div className="h-screen w-screen flex justify-center items-center">
//       <form onSubmit={handleSubmit(response)}>
//       <input type="email" placeholder="anything" {...register("email", { required: "email is required" })} />
//       <input type="submit" />
//     </form>
//     </div>
//   )
// }

// export default UseForm
