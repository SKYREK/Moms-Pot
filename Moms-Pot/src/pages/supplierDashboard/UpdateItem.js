import axios from 'axios'
import React, { useState } from 'react'
import { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateItem = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const material = location.state.data
  const [backgroundImg, setBackgroundImg] = useState('https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg')
  const nameField = useRef()
  const unitField = useRef()
  const descriptionField = useRef()
  const priceField = useRef()
  const quantaField = useRef()
  
  
  return (
    <div className="flex items-center justify-center h-screen my-0 bg-cover"
    style={{backgroundImage: `url(${backgroundImg})`}}

    >
      <div className="absolute bg-black h-screen w-full bg-cover bg-blend-overlay bg-opacity-50"/>
      <div className="m-auto max-w-7xl w-3/6 backdrop-blur-xl bg-white/20 p-2 text-white">
        <div className="mx-32 border-b-2 border-white mt-4">
          <div className="flex justify-start">
            <div className="font-semibold text-2xl">Supplier Dashboard</div>
          </div>
          <div className="flex space-x-2 mt-6 mb-2">
            <div className="flex justify-start mx-10">
              <div className="text-xl font-semibold">Update material</div>
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
                <div className="mt-0">Material Name</div>
                <input
                  type="text"
                  placeholder=""
                  name="dishname"
                  id="dishname"
                  className="p-1 border-white w-full text-gray-600"
                  ref={nameField}
                  defaultValue={material.name}
                />
                <div className="mt-4">Unit (Kg, Nos etc..)</div>
                <input
                  type="text"
                  placeholder=""
                  name="menu"
                  id="menu"
                  className="p-1 border-white w-full text-gray-600"
                  ref={unitField}
                  defaultValue={material.unit}
                />
                <div className="mt-4">Description</div>
                <input
                  type="text"
                  placeholder=""
                  name="description"
                  id="description"
                  className="p-1 border-white w-full text-gray-600"
                  ref={descriptionField}
                  defaultValue={material.description}
                />
                <div className="mt-4">Price</div>
                <input
                  type="number"
                  placeholder=""
                  name="price"
                  id="price"
                  className="p-1 border-white w-full text-gray-600"
                  ref={priceField}
                  defaultValue={material.price}
                />
                <div className="mt-4">Quanta</div>
                <input
                  type="number"
                  placeholder=""
                  name="price"
                  id="price"
                  className="p-1 border-white w-full text-gray-600"
                  ref={quantaField}
                  defaultValue={material.quanta}
                />
              </div>
              
              <div 
              className="bg-purple-500 text-white p-1 px-3 rounded-md text-sm mt-6 cursor-pointer"
              onClick={()=>{
                let materialInfo = {
                    materialId : material._id,
                    name : nameField?.current.value,
                    description : descriptionField?.current.value,
                    price : priceField?.current.value,
                    unit : unitField?.current.value ,
                    quanta : quantaField?.current.value,
                 
                }
                
                axios.put("http://localhost:5000/materials/updateMaterial",materialInfo).then((response)=>{                  
                  navigate("/supplier/dashboard")
                })
              }}>
                + Add new menu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateItem