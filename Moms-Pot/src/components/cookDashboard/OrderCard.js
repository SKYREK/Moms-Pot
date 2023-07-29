import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderCard = (props) => {
  const order = props.order
  return (
    <div>
      {order && (
        <div className="border p-3 my-3 w-full">
          <div className="text-sm w-full">
            <div className="ml-3 justify-center items-start space-y-1 text-start">
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <div className="font-semibold">Order no :</div>
                  
                </div>
                <div>
                <div style={{fontSize: "10px"}}>{order._id}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="font-semibold"> Dish name : </div>
                <div>{props.isMaterial?order.materialName :order.dishName}</div>
              </div>
              <div className="flex space-x-2">
                <div className="font-semibold"> Qty : </div>
                <div>{order.qty}{props.isMaterial}</div>
              </div>
              <div className="flex justify-between" style={{flexDirection : "column"}}>
                <div className="flex space-x-2">
                  <div className="font-semibold"> Total price : </div>
                  <div>{"£ "+ order.total.toFixed(2)}</div>
                </div>
                <br/>
                <div className=" text-sm" >
                
                  <div>Date : {new Date(order.date).toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})}</div>
                  <div>Time :{new Date(order.date).toLocaleString('en-GB', {hour:'numeric', minute: 'numeric', second:'numeric'})}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
