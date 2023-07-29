import React, { useState } from "react";
import { useRef } from "react";
import SearchItem from "./searchItem";
import DishResultHolder from "./searchComponents/dishResultHolder";
import MaterialResultHolder from "./searchComponents/materialResultHolder";
import CookResultHolder from "./searchComponents/cookResultHolder";
import SupplierResultHolder from "./searchComponents/supplierResultHolder";
export default function SearchResultBox({isFood , focused ,unfocused, setResult ,onQueryEnter}){
    const[items , setItems] = useState([])
    const[isVisible,setVisibility] = useState(false)
    const queryRef = useRef(null)
    const  dishRefresher = useRef(null)
    const materialRefresher  = useRef(null)
    const cookRefresher = useRef(null)
    const supplierRefresher = useRef(null)
    focused.current = ()=>{
       
        setVisibility(true)
    }
    unfocused.current=()=>{
        
        setVisibility(false)
    }
    onQueryEnter.current = (query)=>{
        queryRef.current = query
        dishRefresher.current()
        materialRefresher.current()
        cookRefresher.current()
        supplierRefresher.current()
    }
    
    if(!isVisible){
        return (<div></div>)
   
    }else{
        return(<div onMouseEnter={(e)=>{
            unfocused.current = () => setVisibility(true)
        }} onMouseLeave={(e)=>{
            setVisibility(false)
        }}
            className="rounded-lg absolute py-3 space-y-1 justify-center items-center flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none ease-in-out transition-all duration-150"
            style={{
              width: "220px",
              top: "67px",
              flexDirection: "column",
              backgroundColor : "rgba(255,255,255)"
            }}
          >         
            <span style={{fontSize : "20px" }}>Dishes</span>            
            <DishResultHolder query={queryRef} refresher={dishRefresher} setVisibility={setVisibility}/>            
            <hr style={{border : "1px solid grey", width: "200px"}}/>
            <span style={{fontSize : "20px" }}>Materials</span>
            <MaterialResultHolder query={queryRef} refresher={materialRefresher}/>
            <hr style={{border : "1px solid grey", width: "200px"}}/>
            <span style={{fontSize : "20px" }}>Cooks</span>
            <CookResultHolder query={queryRef} refresher={cookRefresher}/>
            <hr style={{border : "1px solid grey", width: "200px"}}/>
            <span style={{fontSize : "20px" }}>Suppliers</span>
            <SupplierResultHolder query={queryRef} refresher={supplierRefresher}/>
            
          </div>)
    }
    
    
}