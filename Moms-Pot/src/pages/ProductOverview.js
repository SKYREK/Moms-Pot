import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import FeedbackCard from "../components/feedback/FeedbackCard";
import axios from "axios";
import CreateFeedbackModal from "../components/feedback/CreateFeedbackModal";

const sampleData = {
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
    menu: ['Rice', 'Eggs', 'Chicken']
};

const sampleFeedbacks = [
  {
    id: 1,
    name: "Basic Tee 8-Pack",
    rating: 3,
    userName: "Jenny T",
    userId: "1223568",
    avgRating: 5,
    noOfRatings: 120,
    price: "$256",
    comment: "Taste food and fast delivery",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwJr1AhjL4_5jSWjRmGDQj46VxvlpAtZb08-FEi5WvricTE6HFheUrWvhDJxn5beEnh4&usqp=CAU",
  },
  {
    id: 2,
    name: "Basic Tee 8-Pack",
    rating: 3,
    avgRating: 5,
    noOfRatings: 120,
    price: "$256",
    comment: "Taste food and fast delivery",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwJr1AhjL4_5jSWjRmGDQj46VxvlpAtZb08-FEi5WvricTE6HFheUrWvhDJxn5beEnh4&usqp=CAU",
    userName: "Jenny T",
    userId: "1223569",
  },
  {
    id: 3,
    name: "Basic Tee 8-Pack",
    rating: 3,
    avgRating: 5,
    noOfRatings: 120,
    price: "$256",
    comment: "Taste food and fast delivery",
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwJr1AhjL4_5jSWjRmGDQj46VxvlpAtZb08-FEi5WvricTE6HFheUrWvhDJxn5beEnh4&usqp=CAU",
    userName: "Jenny T",
    userId: "1223578",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductOverview = () => {
  const [product, setProduct] = useState(sampleData);
  const [feedbacks, setFeedbacks] = useState([]);
  const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const cook = location.state.cook
  const dish = location.state.data
  const [avgRate,setRating] = useState(0)

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

  if(feedbacks.length == 0){
    let info = {
      dishId : dish._id
    }
    
    axios.post("http://localhost:5000/feedbacks/getfeedbackByDish",info).then((response)=>{
      if(response.data.length != 0){
        setFeedbacks(response.data)
      }
    })
  }
  if(avgRate == 0){
    
    axios.get("http://localhost:5000/feedbacks/avgrating/"+dish._id).then((response)=>{
      
      if(response.data.avg != 0 ){
        
        console.log(avgRate)
        setRating(response.data.avg)
      }
    })
  }
  if(!user && showModal){
    alert("please login before adding feed backs!!!!")
    setShowModal(false)
  }


  return (
    <div className="flex max-w-7xl m-auto my-20 justify-center">
      <div className="w-4/12 h-full">
        {" "}
        <div
          key={product.id}
          className="rounded-lg border border-gray-200 h-1/3"
        >
          <div className="h-72 bg-gray-200">
            <img
              src={'http://localhost:5000/dihimggetter/'+dish._id}
              alt={dish.name}
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
                <div>{cook.firstName + " "+cook.lastName}</div>
              </div>
            </div>

            <div className="text-gray-600">
                <div>Menu : </div>
                <div className="ml-10">
                {
                    dish.ingredients && dish.ingredients.map((item, idx) => {
                        return <div className="text-sm"> - {item} </div>
                    })
                }
                </div>
            </div>

            <div className="text-sm pt-3 text-left text-gray-600">
              {dish.description}<br/>
              {dish.isAllergy?<span style={{color : "red"}}>Allergy disclaimer: Beware about ingredients!!!</span>:<span></span>}<br/>
              {dish.isFixed?<span style={{color : "green"}}>{cook.firstName}'s kithchens special dish</span>:<span></span>}
            </div>

            <div className="border-b-2 py-3" />
            <div className="pt-2 flex justify-between">
              <div className="flex space-x-3 justify-start items-center">
                <div className="text-lg font-bold"> Total Price :</div>
                <div className="text-lg font-bold">{"£"+dish.price.toFixed(2)}</div>
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
                    navigate('/checkout', {state: {product : dish, user : user}})
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
      <div className=" w-5/12 ml-3">
        <div className="flex justify-between mb-8">
          <div className="font-bold text-xl">Cook Feedback</div>

          <div className="flex space-x-2">
            <div className=" flex  items-center text-sm">
              <div className="text-gray-500 mr-2">{product.avgRating}</div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      avgRate > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-4 w-4 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="text-gray-500 ml-2">({product.noOfRatings})</div>
            </div>

            <button className="bg-purple-500 p-1 px-3 rounded-md text-sm text-white font-semibold"
            onClick={() => setShowModal(true)}>
              Add Feedback
            </button>
            {
              
            }
            {(showModal && (
              <CreateFeedbackModal
                showModal={showModal}
                setShowModal={setShowModal}
                refresher={setFeedbacks}
                dish={dish}
                feedback = {false}
              />)
            )}
          </div>
        </div>

        <div className="w-full">
          {/* add my feedback part here */}

          {feedbacks.map((feedback, idx) => {
            return <FeedbackCard feedback={feedback} User={user} refresher={setFeedbacks} dish={dish}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
