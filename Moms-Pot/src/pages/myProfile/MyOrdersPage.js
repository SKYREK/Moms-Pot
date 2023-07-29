import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../components/cookDashboard/OrderCard";

export function MyOrdersPage() {
    const[user,setUser]= useState(false)
    const[orders,setOrders]= useState([])
    const navigate = useNavigate()
    const [backgroundImg, setBackgroundImg] = useState(
        "data:image/jpeg;base64,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"
      );

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

          if(user){
            if(orders.length == 0){
                axios.post('http://localhost:5000/orders/placedOrders').then((response)=>{ 
                  console.log(response) 
                if(response.data.length != 0){
                    setOrders(response.data )
                  }  
                
                })  
            }
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
              <div className="font-semibold text-2xl">My Orders</div>
              <div className=" flex items-center text-sm">
                
              </div>
            </div>

            <div className="">
              <div className="flex items-center justify-center flex-col  cursor-pointer">
                {
                    orders.map((order)=>{
                        return <><OrderCard order={order} className={"w-100"}/><br/></>
                    })
                }
                
              </div>
            </div>
          </div>

          

          {/* </div> */}
        </div>
      </div>
    </div>
    )
    
}
