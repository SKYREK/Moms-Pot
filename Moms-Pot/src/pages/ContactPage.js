import axios from "axios";
import React, { useState } from "react";

const ContactPage = () => {
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
  );

  const [isAgree, setIsAgree] = useState(false);

  const onSubmit = () => {
    if(isAgree){
      axios.get("http://localhost:5000/users/enableCook").then((response)=>{
        if(response.data){
          window.location.href = "/cook/dashboard"
        }
      })
    }else{
      alert("Please accept the terms and conditions")
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen my-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-60" />

      <div className="w-6xl max-w-4xl p-2 backdrop-blur-xl bg-white/20 text-white flex flex-col items-center justify-center">
        <div className="px-16 mx-3 border-b-2 border-white mt-4 pb-4">
          <div className="flex justify-center">
            <div className="font-semibold text-3xl text-[42px]">CONTACT US</div>
          </div>        
        </div>
        <div
          className="px-14 py-8 space-y-4 "
          style={{ height: "35rem" }}
        >
          <div>
            
            <div className="py-10" >
            <p className="text-center text-[30px]" >
                MomsPot pvt ltd,{"\n"}</p>
            <p className="text-center text-[30px]">
                   66, Roberts way, Hatfield, UK</p>
            <p className="text-center text-[30px]">
                    AL10 9AB</p>
            <p className="text-center text-[30px]">    
                    momspot@gmail.com{"\n"}</p>
            <p className="text-center text-[30px]">    
                +44 87793074843</p>
            </div>
          </div>
          
         
         
         
         

        
         
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
