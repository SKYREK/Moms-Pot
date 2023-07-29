import React, { useState } from "react";
import OrderCard from "../../components/cookDashboard/OrderCard";
import DishCard from "../../components/cookDashboard/DishCard";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import MaterialCard from "../supplierDashboard/MaterialCard";

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

const sampleUser = {
  name: "Jane J",
  location: "Scotland",
  displayName: 'Maria"s Kitchen',
  phone: "+44356778865",
};

const CookProfile = () => {

  const cook = useLocation().state.data
  const supplier = useLocation().state.supplier
  console.log(useLocation().state)
  const [userImg, setUserImg] = useState(
    'http://localhost:5000/dpgetter/'+cook._id
  );
    
  const [dishes, setDishes] = useState([]);
  const[materials,setMaterials] = useState([])
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [user, setUser] = useState(sampleUser);
  const [totalOrders, setTotalOrders] = useState(202);
  const [userFeedback, setUserFeedback] = useState({
    avgRating: 4.0,
    noOfRatings: 102,
  });

  const [backgroundImg, setBackgroundImg] = useState(
    "data:image/jpeg;base64,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"
  );
  console.log()
  if(!supplier){
    if(dishes.length == 0){

      axios.post('http://localhost:5000/dishes/getDishesByCook',{cookId : cook._id}).then((response)=>{  
      if(response.data.length != 0){
          setDishes(response.data )
        }  
      
      })
    }
  }else{
    if(materials.length == 0){

      axios.post('http://localhost:5000/materials/getMaterialBySupplier',{supplierId : cook._id}).then((response)=>{ 
        console.log(response) 
      if(response.data.length != 0){
          setMaterials(response.data )
        }  
      
      })
    }
  }
  

  return (
    <div className="flex items-center justify-center h-screen bg-cover"
    style={{ backgroundImage: `url(${backgroundImg})` }}
    
    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-40" />

      <div className="m-auto max-w-5xl w-full  p-8 backdrop-blur-xl bg-white/20 text-white">
        <div className=" w-full border-b-2 border-white mt-4">
          <div className="flex justify-between">
            <div className="font-semibold text-2xl">My Profile</div>
            <div className=" flex items-center text-sm">
            <div className=" flex items-center text-sm">
              <div className="mr-2">{userFeedback.avgRating}</div>
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
              <div className="ml-2">
                ({userFeedback.noOfRatings})
              </div>
            </div>
            </div>
          </div>

          <div className="flex justify-between w-1/2 space-x-2 mt-6 mb-2 ">
            <div className="font-semibold text-xl">Overview</div>
            <div className="font-semibold text-lg">
              Total Orders ({totalOrders})
            </div>
          </div>
        </div>

        {/* <Overview userImg={userImg} /> */}
        <div className="flex w-full space-x-3">
          <div className="w-5/12 mt-4">
            <div className="flex justify-center">
              <img
                src={userImg}
                alt="User"
                className="rounded-full w-40 h-40 object-cover"
              />
            </div>
            <div className="flex justify-center mt-4 rounded-md py-3 backdrop-blur-md bg-white/10 ">
              <div className="text-left  w-1/2 space-y-4 text-sm">
                <div className="space-y-1">
                  <div className="font-semibold">Name</div>
                  <div className="border-b-2 pb-1 px-2 border-white text-gray-800">
                    {cook.firstName + " "+ cook.lastName}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold">Location</div>
                  <div className="border-b-2 pb-1 px-2 border-white text-gray-800">
                    {cook.location}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold">Display name</div>
                  <div className="border-b-2 pb-1 px-2 border-white text-gray-800">
                    {cook.firstName+"'s Kitchen"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold">Email</div>
                  <div className="border-b-2 pb-1 px-2 border-white text-gray-800">
                    {cook.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll w-7/12" style={{ height: "28rem" }}>
            {dishes.map((dish, idx) => {
              return<Link to = {'/productOverview'}
              state= {{data : dish, cook : cook}}> <DishCard dish={dish} isButtonVisible={isButtonVisible} /></Link>;
            })}
          </div>
          <div className="overflow-y-scroll w-7/12" style={{ height: "28rem" }}>
            {materials.map((dish, idx) => {
              return<Link to = {'/materialOverview'}
              state= {{data : dish, cook : cook}}> <MaterialCard material={dish} isButtonVisible={isButtonVisible} /></Link>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookProfile;
