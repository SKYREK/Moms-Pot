import React, { useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import MaterialCard from "./MaterialCard";

const products = [
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
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    avgRating: 3.2,
    noOfRatings: 51,
    source: "Anoma's Kitchen",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 3,
    name: "Basic Tee 8-Pack",
    href: "#",
    source: "Maria's Kitchen",
    avgRating: 2,
    noOfRatings: 127,
    price: "$256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
];

const MaterialList = () => {
  const [popularItems, setPopularItems] = useState(products);
  const [list,setList] = useState([])
  const [user,setUser] = useState(false)
  if(!user){
    axios.get("http://localhost:5000/users/getUserData").then((response)=>{
    if(response.data){
      setUser(user)
    }
  }).catch((err)=>{
    console.log(err)
  })
  }
  
  
  // retrieve data from here...
  if(list.length == 0){
    
    axios.get("http://localhost:5000/materials").then((response)=>{
      
      if(!(response.data.length == 0)){
        setList(response.data)
      }
    })
  }
  console.log(list)
  return (
    <div className="bg-white" id="menustart">
      <div className="mx-auto py-10 max-w-7xl px-8">
        <div className="text-start my-6 mb-10 text-3xl font-bold">
          Popular Materials
        </div>

        <div className="grid gap-y-4 grid-cols-3 gap-x-8">
          {list?.map((product) => (
            <MaterialCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialList;
