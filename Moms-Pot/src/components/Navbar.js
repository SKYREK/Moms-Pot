import React, { Fragment, useEffect, useRef, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import SearchResultBox from "./SearchResultBox";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag } from 'react-icons/fa';

const navigation = [
  { name: "Home", href: "#", current: false },
  { name: "Menu", href: "#", current: false },
  { name: "About", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

const profileDropdown1 = [
  { name: "My profile", path: "/profile" },
  { name: "Register as a cook", path: "/cook/cookRegister" },
  { name: "Register as a supplier", path: "/supplier/supplierRegister" },
  { name: "Logout", path: "#" , Onclick : logout},
];

const profileDropdown2 = [
  { name: "My profile", path: "/profile" },
  { name: "Cook Dashboard", path: "/cook/dashboard"},
  { name: "Supplier Dashboard", path: "/supplier/dashboard" },
  { name: "Logout", path: "#" , Onclick : logout},
];

const profileDropdown3 = [
  { name: "My profile", path: "/profile" },
  { name: "Cook Dashboard", path: "/cook/dashboard" },
  { name: "Register as a supplier", path: "/supplier/supplierRegister" },
  { name: "Logout", path: "#" , Onclick : logout},
];
const profileDropdown4 = [
  { name: "My profile", path: "/profile" },
  { name: "Register as a cook", path: "/cook/cookRegister" },
  { name: "Supplier Dashboard", path: "/supplier/dashboard" },
  { name: "Logout", path: "#" , Onclick : logout},
];
const profileDropdown5 = [
  {name: "Login", path: "/SignIn"},
  {name: "Register", path: "/SignUp"}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = () => {
  
  const searchFocused = useRef(null)
  const searchUnFocused = useRef(null)
  const onQueryEnter = useRef(null)
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("selectedItem")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(profileDropdown1);
  const [userImg, setUserImg] = useState("");

  
  const [user, setUser] = useState(false);
  useEffect(()=>{
    if(!user){    
      axios.get("http://localhost:5000/users/getUserData").then((response)=>{
                    
                    if(response.data){
                      if(response.data){
                        setUser(response.data)
                      }
                    }
                  })
      }
  })
 
  if(!user && profileDropdown != profileDropdown5){
    setProfileDropdown(profileDropdown5)
  }else if(user.cookAccount &&  user.saleAccount && profileDropdown != profileDropdown2){
    setProfileDropdown(profileDropdown2)
  }else if(user.cookAccount &&  !user.saleAccount && profileDropdown != profileDropdown3){
    setProfileDropdown(profileDropdown3)
  }else if(!user.cookAccount &&  user.saleAccount && profileDropdown != profileDropdown4){
    setProfileDropdown(profileDropdown4)
  }else if(user && !user.cookAccount &&  !user.saleAccount && profileDropdown != profileDropdown1){
    setProfileDropdown(profileDropdown1)
  }
  

  


  const onItemClick = (item) => {
    setSelectedItem(item.name);
    localStorage.setItem("selectedItem", item.name);
    if(item.name == "Home"){
      window.location.href = "/"
    }else if(item.name == "Menu"){
      window.location.href = "/#menustart"
    }else if(item.name == "About"){
      window.location.href = "/about"
    }else if(item.name == "Contact"){
      window.location.href = "/contact"
    }
  };

  const handleSearch = () => {
    console.log("search clicked");
  };
  
  return (
    <Disclosure as="nav" className="bg-logogrey">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="hidden h-10 w-auto lg:block"
                    src="https://firebasestorage.googleapis.com/v0/b/d-book-6510b.appspot.com/o/MOMS%20POT%201.png?alt=media&token=2b2ccdd6-3992-4936-b03a-a59b6b25c78b"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => onItemClick(item)}
                        className={classNames(
                          item.name == selectedItem
                            ? " text-orange relative"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium transition-all delay-50 cursor-pointer"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                        {item.name == selectedItem && (
                          <div>
                            <span
                              className="absolute bottom-0 w-1 h-0.5 bg-orange rounded-full"
                              aria-hidden="true"
                            ></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* profile dropdown */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="flex mr-2">
                    <input
                      type={"text"}
                      placeholder="Search ..."
                      onChange={(e) => {onQueryEnter.current(e.target.value)}}
                      onFocus={(e)=>{
                        searchFocused.current()
                      }}
                      on
                      onBlur={
                       (e)=>{ searchUnFocused.current()}
                      }
                      
                      
                      className="p-1 pl-2 rounded-md text-sm bg-gray-600 mr-1 w-52"
                    />
                    <SearchResultBox focused={searchFocused} unfocused ={searchUnFocused} setResult={false} isFood={false} query={false} onQueryEnter={onQueryEnter}/>
                    <div className="cursor-pointer" onClick={handleSearch}>
                      <CiSearch size={26} color="white" />
                    </div>
                  </div>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?'http://localhost:5000/dpgetter/'+user._id:"https://media.istockphoto.com/id/1298261537/vector/blank-man-profile-head-icon-placeholder.jpg?s=612x612&w=0&k=20&c=CeT1RVWZzQDay4t54ookMaFsdi7ZHVFg2Y5v7hxigCA="}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="text-left text-sm absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-blue-950 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={
                                "block px-4 py-2 text-sm text-gray-100"
                              }
                            >
                              <div className="flex  items-center space-x-2">
                                <img
                                  className="h-9 w-9 rounded-full"
                                  src={user?'http://localhost:5000/dpgetter/'+user._id:"https://media.istockphoto.com/id/1298261537/vector/blank-man-profile-head-icon-placeholder.jpg?s=612x612&w=0&k=20&c=CeT1RVWZzQDay4t54ookMaFsdi7ZHVFg2Y5v7hxigCA="}
                                  alt=""
                                />
                                <div>{user?(user.firstName + " "+ user.lastName):"Not logged in"}</div>
                              </div>
                            </a>
                          )}
                        </Menu.Item>
                        <div className="border border-b-0 border-gray-400"/>

                        {profileDropdown.map((item, idx) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={item.Onclick?()=>item.Onclick(setUser):null}
                                  href={item.path}
                                  className={classNames(
                                    active ? "bg-blue-900" : "",
                                    "block px-4 py-2 text-sm text-gray-100"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                
                {user&&<Link to={"/myorders"}>
                <button className="flex justify-center items-center w-12 h-12 rounded-full border border-gray-300 shadow-sm transition duration-200 ease-in-out cursor-pointer hover:bg-gray-100">
                  <FaShoppingBag className="text-white text-xl" />
                </button>
                </Link>}
              </div>
            </div>
          </div>        
          
        </>
      )}
    </Disclosure>
  );
  
};
function logout(setUser){
  alert("logout clicked")
  axios.post("http://localhost:5000/users/logout").then((response)=>{
    setUser(false)
    window.location.href = '/'
  })
}

export default Navbar;
