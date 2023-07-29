import React, { useState } from "react";
import Overview from "./Overview";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const[user,setUser] = useState(false)
  const navigate = useNavigate()
  const [userImg, setUserImg] = useState(
    "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg"
  );

  const [isFeedback, setIsFeedback] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(
    "data:image/jpeg;base64,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"
  );
  const [totalOrders, setTotalOrders] = useState(111);
  if(!user){    
    axios.get("http://localhost:5000/users/getUserData").then((response)=>{
                  
                  if(response.data){                      
                    setUser(response.data)                      
                  }else{
                    alert("please login first")
                    navigate("/")
                  }
                })
  }
  return (
    <div
      className="h-screen  my-0 bg-cover"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-30" />
      <div className="flex items-center justify-center h-full ">
        <div className="m-auto max-w-3xl w-full  p-8 backdrop-blur-xl bg-white/20 text-white">
          <div className=" w-full border-b-2 border-white mt-4 ">
            <div className="flex justify-between">
              <div className="font-semibold text-2xl">My Profile</div>
              <div className=" flex items-center text-sm">
                Total orders ({totalOrders})
              </div>
            </div>

            <div className="flex space-x-2 mt-6 mb-2">
              <div className="flex justify-start  space-x-4 cursor-pointer">
                <div
                  className={classNames(
                    isFeedback ? "font-normal" : "font-bold",
                    "text-base"
                  )}
                  onClick={() => setIsFeedback(false)}
                >
                  Overview
                </div>
                <div>|</div>
                <div
                  className={classNames(
                    isFeedback ? "font-bold" : "font-normal",
                    "text-base"
                  )}
                  onClick={() => setIsFeedback(true)}
                >
                  Feedback
                </div>
              </div>
            </div>
          </div>

          {isFeedback ? (
            <>
              <Feedback />
            </>
          ) : (
            <>
              <Overview user={user} userImg={userImg} />
            </>
          )}

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
