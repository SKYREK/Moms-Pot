import mongoose from "../db/conn.js";
import orderSchema from "../models/order.js";


const orderModel = mongoose.model('orders',orderSchema)

export function placeOrder(req,res){
    if(req.logInfo.userLogged){
        let order = new orderModel()
        order.dishName = req.body.dishName
        order.custId = req.logInfo.userObject._id
        order.dishId = req.body.dishId
        order.qty = req.body.qty
        order.total = req.body.total
        order.save().then((result)=>{
            res.send("Order placed successfully. Order number is : "+result._id)
        })
    }else{
        res.send("please login before order")
    }
    
    
}
export function getPlacedOrders(req,res){
    if(req.logInfo.userLogged){
        orderModel.find({custId : req.logInfo.userObject._id},{}).then((result)=>{
            res.send(result)
        })
    }else{
        res.send("please login before view placed orders")
    }
}
export function getRecievedOrders(req,res){
    if(req.logInfo.userLogged){
        if(req.logInfo.userObject.cookAccount){
            orderModel.aggregate([{
                $lookup : {
                    from : "dishes",
                    localField : "dishId",
                    foreignField : "_id",
                    as : "dishes"
                }
            },{
                $match : {"dishes.cookId" : req.logInfo.userObject._id}
            }]).then((result)=>{
                res.send(result)
            });
        }else{
            res.send("you needs to be registered as a cook to recieve orders ")
        }
    }else{
        res.send("please login before view recieved orders")
    }
}