import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import CreateFeedbackModal from "./CreateFeedbackModal";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FeedbackCard = ({ feedback ,User ,dish , refresher}) => {
  const [userId, setUserId] = useState("1223569");
  const [isMyFeedback, setIsMyFeedback] = useState(false);
  const [sender,setSender] = useState(false)
  const [showModal , setShowModal] =  useState(false)
  if(!sender){
    let info = {
      cookId : feedback.userId
    }
    axios.post("http://localhost:5000/users/byId",info).then((response)=>{
      if(response.data){
        setSender(response.data)
      }
  })
  }
  if (User && (User._id == feedback.userId)) {
    if(!isMyFeedback){
      setIsMyFeedback(true);
    }
    
  }
  

  return (
    <>
      {feedback && (
        <div className="border p-3  my-3">
          <div className="flex justify-between">
            <div className="text-sm  cursor-pointer">
              <div className="flex">
                {(
                  <img
                    src={'http://localhost:5000/dpgetter/'+feedback.userId}
                    className="h-12 w-12 rounded-full"
                  />
                )}
                <div className="ml-3 flex justify-center items-center text-start font-semibold">
                  <div className="text-textBlue ">{sender.firstName + " " + sender.lastName}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-lg font-bold text-gray-900">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      feedback.rating > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="my-2">{feedback.description}</div>
          {isMyFeedback && (
            <div className="flex space-x-2 justify-end text-white">
              <button className="bg-yellow-400 p-1 px-3 rounded-md flex items-center space-x-1" onClick={()=>setShowModal(true)}>
                <BiEdit size={20} /> <div>Edit</div>
              </button>
              <button className="bg-red-500 p-1 px-3 rounded-md" onClick={(e)=>{
                  let oldFeedback = {
                    feedbackId : feedback._id
                  }
                axios.delete("http://localhost:5000/feedbacks/deleteFeedback",{data : oldFeedback}).then((response)=>{
                  refresher([])
                })
              }}>
                <RiDeleteBinLine size={20} />
              </button>
            </div>            
          )}
          {showModal && (
              <CreateFeedbackModal
                showModal={showModal}
                setShowModal={setShowModal}
                refresher={refresher}
                dish={dish}
                feedback = {feedback}
              />)
          }
        </div>
      )}
    </>
  );
};

export default FeedbackCard;
