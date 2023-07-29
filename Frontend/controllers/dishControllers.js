import mongoose from "../db/conn.js"
import dishSchema from "../models/dish.js"

export const dishModel = mongoose.model('dishes',dishSchema)

export function createDish(req,res){
    if(req.logInfo.userLogged){
        if(req.logInfo.userObject.cookAccount){
            
            let dish = new dishModel()
            dish.cookId = req.logInfo.userObject._id
            dish.name = req.body.dishName
            dish.description = req.body.description
            dish.price = req.body.price
            dish.isFixed = req.body.isFixed,
            dish.isAllergy = req.body.isAllergy,
            dish.ingredients = req.body.ingredients
            dish.save().then((dishO)=>{
                res.send(dishO)
            });
        }else{
            res.send("please activate your cook account")
        }
    }else{
        res.send("please login")
    }
}
export function updateDish(req,res){
    if(req.logInfo.userLogged){
        dishModel.updateOne({_id : req.body.dishId,cookId : req.logInfo.userObject._id},{$set : {
            cookId : req.logInfo.userObject._id,
            name : req.body.dishName,
            description : req.body.description,
            price : req.body.price,
            isFixed : req.body.isFixed,
            isAllergy : req.body.isAllergy,
            ingredients : req.body.ingredients
        }}).then((result)=>{
            res.send(result)
        })        
        
    }else{
        res.send("please login")
    }
}
export function deleteDish(req,res){
    if(req.logInfo.userLogged){
        dishModel.deleteOne({_id : req.body.dishId , cookId : req.logInfo.userObject._id}).then((result)=>{
            res.send(result)
        })
    }else{
        res.send("Please login first")
    }
}
export function getDishDetails(req,res){
    dishModel.findById(req.body.dishId).then((dish)=>{
        res.send(dish)
    }).catch(()=>{
        res.send("error in finding the dish")
    })
}
export function getFavDishList(req,res){
    
    dishModel.find({},{},{sort : {hitCount : -1}}).then((dishList)=>{
        res.send(dishList)
    }).catch(()=>{
        res.send([])
    })
}
export function getDishesByCook(req,res){
    console.log(req.body.cookId)
    dishModel.find({cookId : req.body.cookId}).then((response)=>{
        
        res.send((response))
    }).catch((err)=>{
        res.send([])
    })
}
export function getDishesByQuery(req,res){
    const regex = new RegExp(req.params.query , 'i')
    dishModel.find({"name" : regex}).limit(5).then((response)=>{
        res.send(response)
    }).catch((err)=>{
        console.log(err)
    })

}