import axios from "axios"

const BACKEND_URL = 'http://localhost:5000/dishes'

export const getAllDishes =(setDishes) => {
    
    axios.get(BACKEND_URL+'/getFavDishList').then((result)=> {
        if(result){
            setDishes(result.data)
        }
    } )
}