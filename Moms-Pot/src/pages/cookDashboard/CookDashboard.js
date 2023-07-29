import React, { useEffect, useState } from "react";
import DishCard from "../../components/cookDashboard/DishCard";
import OrderCard from "../../components/cookDashboard/OrderCard";
import { StarIcon } from "@heroicons/react/20/solid";
import { getAllDishes } from "../../apis/DishApi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sampleDishes = [
  {
    id: 1,
    name: "Basic Tee 8-Pack",
    source: "Maria's Kitchen",
    href: "#",
    avgRating: 5,
    noOfRatings: 120,
    price: "$256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
    menu: ["Rice", "Eggs", "Chicken"],
  },
  {
    id: 2,
    name: "Basic Tee 8-Pack 2",
    source: "Maria's Kitchen 2",
    href: "#",
    avgRating: 4,
    noOfRatings: 141,
    price: "$256.25",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
    menu: ["Rice", "Eggs", "Chicken"],
  },
  {
    id: 3,
    name: "Basic Tee 8-Pack 3",
    source: "Maria's Kitchen 3",
    href: "#",
    avgRating: 2,
    noOfRatings: 41,
    price: "$100",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
    menu: ["Rice", "Eggs", "Chicken"],
  },
  {
    id: 4,
    name: "Basic Tee 8-Pack 3",
    source: "Maria's Kitchen 3",
    href: "#",
    avgRating: 2,
    noOfRatings: 41,
    price: "$100",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
    menu: ["Rice", "Eggs", "Chicken"],
  },
];

const sampleOrders = [
  {
    id: 1,
    name: "Sri lanka special rice",
    source: "Maria's Kitchen",
    price: "$256",
    qty: 5,
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    date: "22-Mar-2023",
    time: "10.25AM",
    menu: ["Rice", "Eggs", "Chicken"],
  },
  {
    id: 2,
    name: "Basic Tee 8-Pack 2",
    source: "Maria's Kitchen 2",
    price: "$256.25",
    qty: 4,
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    date: "22-Mar-2023",
    time: "10.25AM",
    menu: ["Rice", "Eggs", "Chicken"],
  },
  {
    id: 3,
    name: "Basic Tee 8-Pack 3",
    source: "Maria's Kitchen 3",
    price: "$100",
    qty: 1,
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    date: "22-Mar-2023",
    time: "10.25AM",
    menu: ["Rice", "Eggs", "Chicken"],
  },
];

const CookDashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()
  const [totalOrders, setTotalOrders] = useState(56);
  const [user, setUser] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  );


  const [userFeedback, setUserFeedback] = useState({
    avgRating: 4.4,
    noOfRatings: 102,
  });
  

  
  
  if(!user){    
      axios.get("http://localhost:5000/users/getUserData").then((response)=>{
                    
                    if(response.data){                      
                      setUser(response.data)                      
                    }else{
                      alert("please login first")
                      navigate("/")
                    }
                  })
  }else if (!user.cookAccount){
    alert("please register as a cook")
    navigate("/")
  }

  if(dishes.length == 0){

    axios.post('http://localhost:5000/dishes/getDishesByCook',{cookId : user._id}).then((response)=>{  
    if(response.data.length != 0){
        setDishes(response.data )
      }  
    
    })
  }
  if(orders.length == 0){
    axios.post("http://localhost:5000/orders/receivedOrders").then((response)=>{
      if(response.data.length != 0 ){
        setOrders(response.data)
      }
    })
  }

  return (
    <div
      className="flex items-center justify-center h-screen my-0 bg-cover "
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-60" />

      <div className="w-6xl p-2 backdrop-blur-xl bg-white/20 text-white">
        <div className="mx-32 border-b-2 border-white mt-4 ">
          <div className="flex justify-between">
            <div className="font-semibold text-2xl">Cook Dashboard</div>
            <div className=" flex items-center text-sm">
              <div className=" mr-2">{userFeedback.avgRating}</div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      userFeedback.avgRating > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className=" ml-2">({userFeedback.noOfRatings})</div>
            </div>
          </div>
          <div className="flex space-x-2 my-6">
            <div className="flex justify-between w-6/12 mx-10">
              <div className="text-xl font-semibold">Your Dishes</div>
              <Link to ='/cook/addNewDish'>
              <div className="bg-purple-500 text-white p-1 px-3 rounded-md text-sm">
                
                + Add new dish
                
              </div>
              </Link>
            </div>
            <div className="flex justify-between w-6/12 px-8">
              <div className="text-xl font-semibold">Orders</div>
              <div className="text-xl font-semibold">
                Total orders ({orders.length})
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 justify-center p-4">
          <div className="w-5/12 overflow-y-scroll" style={{ height: "30rem" }}>
            {dishes.map((dish, idx) => {
              return <DishCard dish={dish} isButtonVisible={isButtonVisible} refreshList={setDishes}/>;
            })}
          </div>
          
          <div className="w-4/12 overflow-y-scroll" style={{ height: "30rem" }}>
            {orders.map((order, idx) => {
              return <OrderCard order={order} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookDashboard;
