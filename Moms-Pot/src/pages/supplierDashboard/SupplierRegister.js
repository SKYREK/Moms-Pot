import axios from "axios";
import React, { useState } from "react";

const SupplierRegister = () => {
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
  );

  const [isAgree, setIsAgree] = useState(false);
  

  const onSubmit = () => {
    if(isAgree){
      axios.get("http://localhost:5000/users/enableSupplier").then((response)=>{
        if(response.data){
          window.location.href = "/supplier/dashboard"
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
            <div className="font-semibold text-3xl">Register as a supplier</div>
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
              You must be at least 18 years of age and possess the legal
              authority to enter into this agreement as a supplier. By
              registering on our website, you represent that you meet these
              eligibility requirements.
            </div>
          </div>
          <div>
            <div className="font-bold">Registration</div>
            <div>
              To become a supplier on our platform, you will need to register
              and create an account. You agree to provide accurate and complete
              information during the registration process.
            </div>
          </div>
          <div>
            <div className="font-bold">Product Listings</div>
            <div>
              You are responsible for ensuring that all information,
              descriptions, and images of your products are accurate and
              up-to-date. You agree to provide high-quality products that meet
              our standards, and to promptly update product information if any
              changes occur.
            </div>
          </div>
          <div>
            <div className="font-bold">Compliance with Laws</div>
            <div>
              As a supplier, you are responsible for complying with all
              applicable laws and regulations, including those related to food
              safety, labeling, and marketing. You agree to provide products
              that are safe and legally compliant.
            </div>
          </div>
          <div>
            <div className="font-bold">Payment and Fees</div>
            <div>
              You agree to pay any fees associated with using our platform, as
              outlined in our fee schedule. You are responsible for maintaining
              accurate payment information and for paying all fees in a timely
              manner.
            </div>
          </div>
          <div>
            <div className="font-bold">Termination</div>
            <div>
              We reserve the right to terminate your account and remove your
              product listings at any time, without notice, if we determine that
              you have violated these terms and conditions or any applicable
              laws or regulations.
            </div>
          </div>
          <div>
            By registering as a supplier on our website, you acknowledge that
            you have read and agree to these terms and conditions, and that you
            will comply with all applicable laws and regulations.
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
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierRegister;
