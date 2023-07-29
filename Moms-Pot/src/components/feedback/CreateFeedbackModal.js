import axios from "axios";
import React, { useState } from "react";

const CreateFeedbackModal = ({ showModal, setShowModal ,refresher , dish , feedback}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  if(feedback && comment == ""){
    if(feedback.description != ""){
      setComment(feedback.description)
    }
  }
  if(feedback && rating == 5){
    if(feedback.rating != 5){
      setRating(feedback.rating)
    }
  }

  const onSubmit = () => {
    if(feedback){
      const newFeedback = {
        feedbackId : feedback._id,
        rating : rating,
        description : comment
      }
      axios.put("http://localhost:5000/feedbacks/updateFeedback",newFeedback).then((response)=>{
        setShowModal(false);
        refresher([])
      })
    }else{
      const newFeedback = {
        dishId : dish._id,
        rating : rating,
        description : comment
      }
      axios.post("http://localhost:5000/feedbacks/createFeedback",newFeedback).then((response)=>{
        setShowModal(false);
        refresher([])
      })
    }    
    
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-in-out transition-all duration-150">
            <div className="relative w-2/5 my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-lg font-semibold px-5 py-2">
                    Your feedback
                  </h3>
                  <button
                    className="p-1 pr-2 ml-auto border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-gray-500 opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mx-8">
                  <textarea
                    defaultValue={comment}
                    type="text"
                    placeholder="Add your comment ..."
                    name="feedback"
                    id="feedback"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    rows={3}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="flex mt-6">
                    <label>Add your rank out of 5 : </label>
                    <div className="flex justify-start ml-4">
                      <input
                        defaultValue={rating}
                        type="number"
                        max={5}
                        min={0}
                        className="border inline-flex justify-center border-gray-300 rounded-md pl-3 w-14 "
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </div>{" "}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-purple-500 text-white  font-boldtext-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateFeedbackModal;
