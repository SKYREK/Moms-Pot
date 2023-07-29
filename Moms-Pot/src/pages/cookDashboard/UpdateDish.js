import React, { useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateDish = () => {
const location = useLocation()
const dish = location.state.data
const [user, setUser] = useState(false);
const navigate = useNavigate()
const [backgroundImg, setBackgroundImg] = useState('https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg')
const nameField = useRef()
const menuField = useRef()
const descriptionField = useRef()
const priceField = useRef()
const allergyField = useRef()
const specialField = useRef()
  if(!user){    
    axios.get("http://localhost:5000/users/getUserData").then((response)=>{
                  
                  if(response.data){                      
                    setUser(response.data)                      
                  }else{
                    alert("please login first")
                    navigate("/")
                  }
                })
  }else if (!user.cookAccount){
    alert("please register as a cook")
    navigate("/")
  }
  
    var iList = ""
    
    dish.ingredients.map((ingredient)=>{
      iList+= ingredient+"-"
    })
    
    iList =  iList.slice(0,-1)
    
  return (
    <div className="flex items-center justify-center h-screen my-0 bg-cover"
    style={{backgroundImage: `url(${backgroundImg})`}}

    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-50"/>
      <div className="m-auto max-w-7xl w-3/6 backdrop-blur-xl bg-white/20 p-2 text-white">
        <div className="mx-32 border-b-2 border-white mt-4">
          <div className="flex justify-start">
            <div className="font-semibold text-2xl">Cook Dashboard</div>
          </div>
          <div className="flex space-x-2 mt-6 mb-2">
            <div className="flex justify-start mx-10">
              <div className="text-xl font-semibold">Update dish</div>
            </div>
          </div>
        </div>

        {/* body of the card */}
        <div className="flex w-full py-2">
          <div className="w-1/2 flex justify-center items-center">
            {/* img */}
            <img
              className="h-40 w-40 object-cover"
              alt="Dish img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4QylJyu3MkOsKpfDgvDJaOJ2dsBaBAR5MG-1CCtSsHF6CAVB3nTl8nZJOAxgLR_PVCmU&usqp=CAU"
            />
          </div>
          <div className=" w-1/2 flex justify-start">
            {/* form */}
            <div>
              <div className="w-full">
                <div className="mt-0">Dish Name</div>
                <input
                  type="text"
                  placeholder=""
                  name="dishname"
                  id="dishname"
                  className="p-1 border-white w-full text-gray-600"
                  defaultValue={dish.name}
                  ref={nameField}
                />
                <div className="mt-4">Menu (Enter your ingredients devided by dashes)</div>
                <input
                  type="text"
                  placeholder=""
                  name="menu"
                  id="menu"
                  defaultValue={iList}
                  className="p-1 border-white w-full text-gray-600"
                  ref={menuField}
                />
                <div className="mt-4">Description</div>
                <input
                  type="text"
                  placeholder=""
                  name="description"
                  id="description"
                  className="p-1 border-white w-full text-gray-600"
                  ref={descriptionField}
                  defaultValue={dish.description}
                />
                <div className="mt-4">Price</div>
                <input
                  type="number"
                  placeholder=""
                  name="price"
                  id="price"
                  className="p-1 border-white w-full text-gray-600"
                  ref={priceField}
                  defaultValue={dish.price}
                />
              </div>
              <div className="flex space-x-1 mt-4">
                <input
                  type="checkbox"
                  id="check_allergy"
                  name="check_allergy"
                  ref={allergyField}
                />
                <div>Allergy Disclaimer</div>
              </div>
              <div className="flex space-x-1">
                <input
                  type="checkbox"
                  id="check_special"
                  name="check_special"
                  ref={specialField}
                  defaultChecked={dish.isFixed}
                />
                <div>Moms Special Dish</div>
              </div>
              <div 
              className="bg-purple-500 text-white p-1 px-3 rounded-md text-sm mt-6 cursor-pointer"
              onClick={()=>{
                let dishInfo = {
                  dishId : dish._id,
                  dishName : nameField?.current.value,
                  description : descriptionField?.current.value,
                  price : priceField?.current.value,
                  isFixed : specialField?.current.checked ,
                  isAllergy : allergyField?.current.checked,
                  ingredients : (menuField?.current.value).split("-")
                }
                
                axios.put("http://localhost:5000/dishes/updateDish",dishInfo).then((response)=>{                  
                  navigate("/cook/dashboard")
                })
              }}>
                Update dish
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDish