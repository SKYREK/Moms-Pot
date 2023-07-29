import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiVisaLine, RiMastercardFill, RiPaypalFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";



const MaterialCheckout = () => {
  
  const location = useLocation();
  const navigate = useNavigate()
  const {user,product} = location.state
  const [qty,setQty] = useState(product.quanta)
  const [total,setTotal] =useState(((product.price * qty)/product.quanta).toFixed(2))
  if(total != ((product.price * qty)/product.quanta).toFixed(2)){
    setTotal(((product.price * qty)/product.quanta).toFixed(2))
  }
  console.log(location.state)
  return (
    <div className="flex justify-center my-10">
      <div className="w-4/12 max-w-lg">
        <div className="text-xl font-bold text-blue-400 my-4">
          {product.name}
        </div>
        <div className="w-full h-full ">
          {" "}
          <div
            key={product._id}
            className="rounded-lg border border-gray-200"
          >
            <div className="h-72 bg-gray-200">
              <img
                src={"http://localhost:5000/mimggetter/"+product._id}
                alt={product.imageAlt}
                className=" w-full h-full object-cover object-center"
              />
            </div>
            <div className="space-y-2 p-4">
              <div className="text-gray-600">
                <div>Menu : </div>
                <div className="ml-10">
                  {product.ingredients &&
                    product.ingredients.map((item, idx) => {
                      return <div className="text-sm"> - {item} </div>;
                    })}
                </div>
              </div>

              <div className="text-sm pt-3 text-left text-gray-600">
                {product.description}
              </div>

              <div className="border-b-2 pt-4" />
              <div className=" w-full flex justify-center">
                <div className="w-3/4">
                  <div className="flex space-x-3 justify-between items-center">
                    <div className="text-lg font-bold flex items-center space-x-2">
                      <input
                        id="paymentType"
                        name="paymentType"
                        type="radio"
                        value=""
                        class="w-4 h-4 bg-gray-100 rounded "
                      />
                      <RiVisaLine size={34} />
                    </div>
                    <div className="text-lg font-bold flex items-center space-x-2">
                      <input
                        id="paymentType"
                        name="paymentType"
                        type="radio"
                        value=""
                        class="w-4 h-4  bg-gray-100 rounded"
                      />
                      <RiMastercardFill size={34} />
                    </div>
                    <div className="text-lg font-bold flex items-center space-x-2">
                      <input
                        id="paymentType"
                        name="paymentType"
                        type="radio"
                        value=""
                        class="w-4 h-4 bg-gray-100 rounded"
                      />
                      <RiPaypalFill size={30} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b-2 py-0" />
              <div className="flex justify-between ">
                <div className="flex space-x-3 justify-start items-center">
                  <div className="text-xl font-bold"> Qty :</div>
                  <div className="text-xl font-bold"><input
                  type="number"                 
                  className="border-grey  text-black-600"
                  style={{border : "1px solid black",width : "80px"}}
                  defaultValue={qty}
                  onChange={(e)=>{
                    if(e.target.value>0){
                      setQty(e.target.value)
                    }
                  }}
                  min = {product.quanta}
                /> {product.unit}</div>
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="flex space-x-3 justify-start items-center">
                  <div className="text-xl font-bold"> Total Price :</div>
                  <div className="text-xl font-bold">{total}</div>
                </div>
              </div>
             
              <div className="border-b-2 py-0" />
              <div className="flex justify-between">
                <button className="text-base border border-red-500 text-red-500 p-1 px-3 rounded-md" onClick={()=>{
                  navigate("/")
                }}>
                  {" "}
                  Cancel
                </button>
                <button className="text-base border text-white p-1 px-3 rounded-md bg-green-500"
                onClick={()=>{
                  const model = {
                    materialName: product.name,
                    dishId : product._id,
                    qty : qty,
                    total : total,
                    supplierId :  product.supplierId
                  }
                  axios.post("http://localhost:5000/materialOrders/placeMaterialOrder",model).then((response)=>{
                    navigate("/")
                  })
                }}>
                  Checkout
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCheckout;
