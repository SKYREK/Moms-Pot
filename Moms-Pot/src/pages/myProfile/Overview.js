import axios from "axios";
import React, { useRef } from "react";

const Overview = ({ userImg , user}) => {
  const fNameField = useRef()
  const lNameField = useRef()
  const locationField = useRef()
  const emailField = useRef()
  const cookField = useRef()
  const saleField = useRef()
  const dpLink = useRef()
  return (
    <div className="flex p-5 h-130 overflow-y-auto">
      <div className="w-full flex justify-center items-center">
        {/* profile img */}
        <img
          src={'http://localhost:5000/dpgetter/'+user._id}
          alt="User img"
          className="rounded-full w-44 h-44 object-cover"
        />
      </div>
      <div className="w-full">
        {/* info */}
        <div>
          <div className="w-full">
            <div className="mt-0">First name:</div>
            <input
              type="text"
              placeholder=""
              name="name"
              id="name"
              className="p-1 border-white w-full text-gray-600"
              defaultValue={user.firstName}
              ref={fNameField}
            />
            <div className="mt-4">Last name:</div>
            <input
              type="text"
              placeholder=""
              name="phone"
              id="phone"
              className="p-1 border-white w-full text-gray-600"
              defaultValue={user.lastName}
              ref={lNameField}
            />
            <div className="mt-4">Location:</div>
            <input
              type="text"
              placeholder=""
              name="location"
              id="location"
              className="p-1 border-white w-full text-gray-600"
              defaultValue={user.location}
              ref={locationField}
            />
            <div className="mt-4">Email address:</div>
            <input
              type="email"
              placeholder=""
              name="email"
              id="email"
              className="p-1 border-white w-full text-gray-600"
              defaultValue={user.email}
              ref={emailField}
            />
            {user.cookAccount&&<div className="flex space-x-1">
                <input
                  type="checkbox"
                  id="check_special"
                  name="check_special"
                  defaultChecked={user.cookAccount}
                  ref={cookField}
                />
                <div>Activate cook account</div>
              </div>}
              {user.saleAccount&&<div className="flex space-x-1">
                <input
                  type="checkbox"
                  id="check_special"
                  name="check_special"
                  defaultChecked={user.saleAccount}
                  ref={saleField}
                />   
                <div>Activate sale account</div>             
              </div>}
              
                <input
                  type="file"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className="p-1 px-2 border-white w-full text-gray-100 bg-transparent border placeholder:text-gray-100"
                  ref={dpLink}
                />
          </div>

          <div className="flex justify-between">
            <div className="bg-purple-500 text-white p-1 px-3 rounded-md text-sm mt-6 cursor-pointer"
            onClick={()=>{
              const newUser={
                "email": emailField.current.value,
                "firstName" : fNameField.current.value,
                "lastName" : lNameField.current.value,
                "location" : locationField.current.value,
                "cookEnabled" : cookField.current?cookField.current.checked:false,
                "saleEnabled" : saleField.current?saleField.current.checked:false
              }
              axios.put("http://localhost:5000/users/updateUserData",newUser).then((response)=>{
                const fd = new FormData(); 
                if(dpLink.current.files[0]){
                  fd.append('image', dpLink.current.files[0],user._id + ".jpg")
                  axios.post("http://localhost:5000/dp",fd).then((response)=>{
                  console.log(response)  
                  window.location.href = '/'
                })
                }else{
                  window.location.href = '/'
                }      
                
              
                
              })
            }}>
              Update details
            </div>
            <div className="bg-red-500 text-white p-1 px-3 rounded-md text-sm mt-6">
              Delete account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
