import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.unsplash.com/photo-1568093858174-0f391ea21c45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate()
  const dpLink = useRef()
  //email validation function
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)){      
      return true
    }else{
      alert("Invalid Email")
      return false
    }
  };
  const onSignUp = () => {
    
    if (password == passwordConfirm && validateEmail(email)) {
      console.log(firstName, lastName, email, password, location);
      let newUser = {
        email:email,
        password : password,
        firstName : firstName,
        lastName : lastName,
        location : location,
        cookEnabled : false,
        saleEnabled : false
      }
      axios.post("http://localhost:5000/users/register",newUser).then((response)=>{
        if(response.data != ""){  
          const fd = new FormData();          
          fd.append('image', dpLink.current.files[0],response.data + ".jpg")
          axios.post("http://localhost:5000/dp",fd).then((response)=>{
          console.log(response)  
          window.location.href = '/'
          })
          
        }
      })
    } else {
      alert("Passwords mismatched ");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-70" />

      <div className="m-auto max-w-md w-full  p-8 backdrop-blur-xl bg-white/20 text-white">
        <div className=" w-full border-b-2 border-white mt-4 pb-4">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="font-semibold text-2xl">Sign Up</div>
              <div className="font-semibold text-sm mt-3">
                Register to the Moms Pot
              </div>
            </div>
          </div>
        </div>

        <div className="my-8">
          <div className="w-full space-y-6 text-sm">
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="First name"
                name="firstName"
                id="firstName"
                className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Last name"
                name="lastName"
                id="lastName"
                className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="email"
              placeholder="Your email address"
              name="email"
              id="email"
              className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
              onChange={(e) => setEmail(e.target.value)}
            />

            

            <input
              type="text"
              placeholder="Your location"
              name="location"
              id="location"
              className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="passwordConfirm"
              id="passwordConfirm"
              className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <input
              type="file"
              
              className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
              ref={dpLink}
            />
          </div>

          <div
            className="bg-red-500 text-center font-bold text-white p-1 px-3 rounded-md text-sm mt-6 cursor-pointer"
            onClick={onSignUp}
          >
            Sign Up
          </div>
          <div className="font-semibold text-sm mt-3 text-center">
            Already have an account?{" "}
            <Link className="text-blue-400 font-normal" to="/signIn">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
