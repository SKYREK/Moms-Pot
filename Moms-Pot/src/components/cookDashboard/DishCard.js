import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DishCard = ({ dish, isButtonVisible,refreshList }) => {
  
  return (
    <div>
      {dish && (
        <div className="border p-3 my-3">
          <div className="flex justify-between">
            <div className="text-sm">
              <div className="flex">
                {dish && (
                  <img src={'http://localhost:5000/dihimggetter/'+dish._id} className="h-32 w-32" />
                )}
                <div className="ml-3 justify-center items-start space-y-1 text-start">
                  <div className="flex space-x-2">
                    <div className="font-semibold"> Name : </div>
                    <div>{dish.name}</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="font-semibold"> Price : </div>
                    <div>£ {dish.price.toFixed(2)}</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="font-semibold whitespace-nowrap">
                      {" "}
                      Menu :{" "}
                    </div>
                    <div>
                      {dish.ingredients &&
                        dish.ingredients.map((item, idx) => <>{item} , </>)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="font-semibold whitespace-nowrap">
                      {" "}
                      Description :{" "}
                    </div>
                    <div>{dish.description}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-lg font-bold text-gray-900">
              <div className="flex items-center"></div>
            </div>
          </div>

          {isButtonVisible && (
            <div className="flex space-x-2 justify-end text-white mt-4">
              <Link
              to = {'/cook/updateDish'}
              state= {{data : dish}}
              >
              
                <button className="bg-yellow-400 p-1 px-3 rounded-md flex items-center space-x-1">
                  <BiEdit size={20} /> <div>Edit</div>
                </button>
              </Link>
              <button className="bg-red-500 p-1 px-3 rounded-md"
              onClick={(e)=>{
                if(window.confirm("Are you sure you want to delete dish named : "+dish.name+"?")){
                  axios.delete("http://localhost:5000/dishes/deleteDish",{data : {dishId : dish._id}}).then((response)=>{
                  refreshList([])
                })
                }
                
              }}>
                <RiDeleteBinLine size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DishCard;
