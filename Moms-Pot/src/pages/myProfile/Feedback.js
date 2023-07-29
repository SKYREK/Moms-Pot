import React, { useState } from "react";
import FeedbackCard from "./FeedbackCard";

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

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(sampleFeedbacks);

  return (
    <div className="h-96 overflow-y-auto">
      {feedbacks.map((feedback, idx) => {
        return <FeedbackCard feedback={feedback} />;
      })}
    </div>
  );
};

export default Feedback;
