import axios from 'axios'
import React, { useState } from 'react'
export default function SupplierResultHolder(props){
    let query = props.query.current
    let pastQuery
    const refreshList = props.refreshList
    const [resultList , setResultSet] = useState([])
    
    props.refresher.current = ()=>{
            console.log(query)
            query = props.query.current
            axios.get("http://localhost:5000/users/searchSuppliers/"+query).then((response)=>{
            pastQuery = query
            if(response.length != 0){
                console.log(response.data)
                setResultSet(response.data)
            }
        })
    }
    
    
    console.log(resultList)
    return(
        <>
        {resultList.map((item ,  index)=>
        {
            return<div style={{height : "50px",width : "100%", display: "flex" , flexDirection : "row" , padding : "5px", alignItems : "center"}}><img src={'http://localhost:5000/dpgetter/'+item._id} style={{width:"40px" ,height : "40px", marginLeft: "0px", marginRight : "5px"}}/><div> {item.firstName + " " + item.lastName}</div></div>

        })}
        </>
    )
        
}