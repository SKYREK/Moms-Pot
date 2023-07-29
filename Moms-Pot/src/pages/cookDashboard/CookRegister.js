import axios from "axios";
import React, { useState } from "react";

const CookRegister = () => {
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
  );

  const [isAgree, setIsAgree] = useState(false);

  const onSubmit = () => {
    if(isAgree){
      axios.get("http://localhost:5000/users/enableCook").then((response)=>{
        if(response.data){
          window.location.href = "/cook/dashboard"
        }
      })
    }else{
      alert("Please accept the terms and conditions")
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen my-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-60" />

      <div className="w-6xl max-w-4xl p-2 backdrop-blur-xl bg-white/20 text-white">
        <div className="px-16 mx-3 border-b-2 border-white mt-4 pb-4">
          <div className="flex justify-center">
            <div className="font-semibold text-3xl">Register as a cook</div>
          </div>

          <div className="text-lg mt-2 font-semibold">Accepting the terms</div>
        </div>
        <div
          className="px-14 py-8 space-y-4 overflow-y-scroll"
          style={{ height: "35rem" }}
        >
          <div>
            <div className="font-bold">Eligibility</div>
            <div>
              In order to register as a food seller on our site, you must be at
              least 18 years old and legally able to enter into binding
              contracts. You must also have all necessary permits and licenses
              to prepare and sell food in accordance with local laws and
              regulations.
            </div>
          </div>
          <div>
            <div className="font-bold">Account Information</div>
            <div>
              When you register as a food seller, you must provide accurate and
              complete information about yourself and your business, including
              your name, contact information, and any required food preparation
              or handling certifications.
            </div>
          </div>
          <div>
            <div className="font-bold">Food Safety</div>
            <div>
              You agree to comply with all applicable food safety regulations,
              including proper storage, handling, and preparation of food
              products sold on our site. You must also clearly label all
              ingredients and potential allergens in your food products, and
              provide any necessary warnings or disclaimers.
            </div>
          </div>
          <div>
            <div className="font-bold">Listing Guidelines</div>
            <div>
              You agree to comply with our listing guidelines, which may include
              restrictions on the types of food products that can be sold on our
              site, as well as any required product descriptions, images, or
              pricing information. You must also accurately represent the
              quality and freshness of your food products.
            </div>
          </div>
          <div>
            <div className="font-bold">Sales Transactions</div>
            <div>
              You are responsible for fulfilling any orders placed through your
              seller account, including processing payments, packaging and
              delivering food products, and handling customer inquiries or
              disputes. You agree to comply with all applicable laws and
              regulations related to sales transactions, including any tax or
              food safety requirements.
            </div>
          </div>
          <div>
            <div className="font-bold">Termination</div>
            <div>
              We reserve the right to terminate your food seller account at any
              time, with or without cause. In the event of termination, you will
              remain responsible for any outstanding fees or obligations related
              to sales transactions that occurred prior to termination.
            </div>
          </div>
          <div>
            By registering as a food seller on our site, you agree to comply
            with these terms and conditions and any applicable laws and
            regulations.
          </div>

          <div className="flex space-x-3">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              onChange={() => setIsAgree(!isAgree)}
            />
            <div>I Agree</div>
          </div>
          <div className="justify-center flex">
            <button
              className="bg-green-500 p-1 px-3 rounded-md"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookRegister;
