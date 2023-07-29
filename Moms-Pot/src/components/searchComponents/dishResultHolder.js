import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function DishResultHolder(props){
    let query = props.query.current
    
    let pastQuery
    const refreshList = props.refreshList
    const [resultList , setResultSet] = useState([])
    const navigate = useNavigate()
    props.refresher.current = ()=>{
            console.log("asdfasd")
            query = props.query.current
            axios.get("http://localhost:5000/dishes/search/"+query).then((response)=>{
            pastQuery = query
            if(response.length != 0){
                console.log(response.data)
                setResultSet(response.data)
            }
        })
    }
    
    

    return(
        <>
        {resultList.map((item ,  index)=>
        {
            return  <div onClick={(e)=>{
                let info = {
                    cookId : item.cookId
                  }
              
                axios.post("http://localhost:5000/users/byId",info).then((response)=>{
                    navigate("/productOverview" , {state : {
                        data : item,
                        cook : response.data
                    }})
                })     
               
            }} style={{height : "50px",width : "100%", display: "flex" , flexDirection : "row" , padding : "5px", alignItems : "center"}}><img src={'http://localhost:5000/dihimggetter/'+item._id} style={{width:"40px" ,height : "40px", marginLeft: "0px", marginRight : "5px"}}/><div> {item.name}</div></div>
        })}
        </>
    )
        
}