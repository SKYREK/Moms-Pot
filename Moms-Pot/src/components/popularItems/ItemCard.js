import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ItemCard = ({ product }) => {
  const navigate = useNavigate()
  const [cook,setCook] = useState(false)
  const [user, setUser] = useState(false);
  const [avgRating,setRating] = useState(0)
  if(!cook){
    console.log(product.cookId)
    let info = {
      cookId : product.cookId
    }

    axios.post("http://localhost:5000/users/byId",info).then((response)=>{
      if(response.data){
        setCook(response.data)
      }
    })
  }
  if(avgRating == 0){
    console.log("http://localhost:5000/feedbacks/avgrating/"+product._id)
    axios.get("http://localhost:5000/feedbacks/avgrating/"+product._id).then((response)=>{
      
      if(response.data.avg != 0 ){
        
        console.log(response)
        setRating(response.data.avg)
      }
    })
  }
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
  
  return (
    <div
      key={product._id}
      className=" relative flex flex-col overflow-hidden rounded-lg border border-gray-200"
    >
      <div className="aspect-w-3 aspect-h-4 h-1/2 bg-gray-200">
        <img
          src={'http://localhost:5000/dihimggetter/'+product._id}
          alt={product.name}
          className="h-full w-full object-cover object-center hover:opacity-75"
        />
      </div>
      <div className="flex  flex-col align-bottom space-y-2 p-4">
        <div className="flex justify-between">
          <div className="text-sm  cursor-pointer">
            <div className="flex">
              <img
                src={'http://localhost:5000/dpgetter/'+cook._id}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-3 justify-center text-start font-semibold">
                <div className="text-textBlue">{product.name}</div>
                <Link to={'/cook/profile'} state={{data : cook}}><div>{cook?.firstName+" "+cook?.lastName}</div></Link>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-900">£{product.price.toFixed(2)}</div>
        </div>
        <div className="pt-2 flex justify-start">
        <div className="text-gray-500 mr-2">
            {product.avgRating}
          </div>
          <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      avgRating > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
          </div>
          <div className="text-gray-500 ml-2">
            
          </div>
        </div>

        <p className="text-sm text-left text-gray-500">{product.description}</p>

        <div className="border-b-2 py-3"  />
        <div className="pt-2 flex justify-between">
          <Link to = {'/productOverview'}
            state= {{data : product, cook : cook}}>
          <div className="text-sm text-textBlue cursor-pointer">
            {" "}
            View more{" "}
          </div>
          </Link>
          <button className="bg-green-500 p-1 px-2 rounded-md text-white cursor-pointer" 
             onClick={() => {
              if(!user){
                alert("Please login before place order")
              }else{
                navigate('/checkout', {state: {product : product, user : user}})
              }
                
            }}>
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
