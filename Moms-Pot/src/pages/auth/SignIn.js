import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SignIn = () => {
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.unsplash.com/photo-1568093858174-0f391ea21c45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  );
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-70" />

      <div className="m-auto max-w-sm w-full  p-8 backdrop-blur-xl bg-white/20 text-white">
        <div className=" w-full border-b-2 border-white mt-4 pb-4">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="font-semibold text-2xl">Sign In</div>
              <div className="font-semibold text-sm mt-3">
                Please sign in to your account
              </div>
            </div>
          </div>
        </div>

        <div className="my-8">
          <div className="w-full space-y-6 text-sm">
            <input
              type="text"
              placeholder="Email or phone"
              name="email"
              id="email"
              className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="bg-red-500 text-center font-bold text-white p-1 px-3 rounded-md text-sm mt-6" style={{cursor : "pointer"}}
          onClick={()=>{
            if(email == ""){
              alert("insert valid email");
              return
            }
            if(password == ""){
              alert("insert valid password")
              return
            }
            axios.post("http://localhost:5000/users/login",{ email : email, password: password}).then((response)=>{
              console.log(response)
              
              axios.get("http://localhost:5000/users/getUserData").then((response)=>{
                console.log(response.data)
                if(response.data){
                  
                  window.location.href = '/'
                }else{
                  alert("incorrect password")
                }
              })
            })
          }}>
            Login
          </div>
          <div className="font-semibold text-sm mt-3 text-center">
            <Link className="text-blue-400 font-normal" to="/signUp">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
