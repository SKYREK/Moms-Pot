import { StarIcon } from "@heroicons/react/20/solid";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FeedbackCard = ({feedback}) => {
  return (
    <div>
      {" "}
      {feedback && (
        <div className="border p-3  my-3">
          <div className="flex justify-between">
            <div className="text-sm  cursor-pointer">
              <div className="flex">
                {feedback.userImg && (
                  <img
                    src={feedback.userImg}
                    className="h-12 w-12 rounded-full"
                  />
                )}
                <div className="ml-3 flex justify-center items-center text-start font-semibold">
                  <div className="text-textBlue ">{feedback.name}</div>
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

          <div className="my-2">{feedback.comment}</div>

          <div className="flex space-x-2 justify-end text-white">
            <button className="bg-yellow-400 p-1 px-3 rounded-md flex items-center space-x-1">
              <BiEdit size={20} /> <div>Edit</div>
            </button>
            <button className="bg-red-500 p-1 px-3 rounded-md">
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
