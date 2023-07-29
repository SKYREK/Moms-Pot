import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

import axios from "axios";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MaterialOverview = () => {
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
    const cook = location.state.cook
    const dish = location.state.data

  useEffect(()=>{
    if(!user){    
      axios.get("http://localhost:5000/users/getUserData").then((response)=>{
                    console.log(response.data)
                    if(response.data){
                      if(response.data){
                        setUser(response.data)
                      }
                    }
                  })
      }
  })

  
 


  return (
    <div className="flex max-w-7xl m-auto my-20 justify-center">
      <div className="w-4/12 h-full">
        {" "}
        <div
         
          className="rounded-lg border border-gray-200 h-1/3"
        >
          <div className="h-72 bg-gray-200">
            <img
              src={"http://localhost:5000/mimggetter/"+dish._id}
              //alt={dish.name}
              className=" w-full h-full object-cover object-center hover:opacity-75"
            />
          </div>
          <div className="space-y-2 p-4">
            <div className="text-sm cursor-pointer grid items-center justify-center">
              <div className="flex justify-center">
                <img
                  src={'http://localhost:5000/dpgetter/'+cook._id}
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="justify-center font-semibold">
                <Link to={'/supplier/profile'} state= {{data : cook , supplier: true}}><div>{cook.firstName + " " + cook.lastName}</div></Link>
              </div>
            </div>

            <div className="">
                <div className=" font-semibold">Material name : {dish.name}</div>
                <div className=" font-semibold">Description : {dish.description}</div>
                <div className=" font-semibold">Minimum quantity : {dish.quanta} {dish.unit}</div>
            </div>

            <div className="text-sm pt-3 text-left text-gray-600">
              {/*dish.description*/}
            </div>

            <div className="border-b-2 py-3" />
            <div className="pt-2 flex justify-between">
              <div className="flex space-x-3 justify-start items-center">
                <div className="text-lg font-bold">Price :</div>
                <div className="text-lg font-bold">{"£"+dish.price.toFixed(2)+" per "+ dish.quanta + " "+dish.unit}</div>
              </div>
              {/* <Link to = {{
                pathname: '/checkout',
                state: {data: product}
              }}> */}
              <button className="bg-green-500 p-1 px-2 rounded-md text-white cursor-pointer"
                onClick={() => {
                  if(!user){
                    alert("Please login before place order")
                  }else{
                    navigate('/materialCheckout', {state: {product :dish, user : user}})
                  }
                    
                }}
              >
                Order now
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MaterialOverview;
