import mongoose from "../db/conn.js";
import materialOrderSchema from "../models/materialOrder.js";


const materialOrderModel = mongoose.model('materialOrders',materialOrderSchema)

export function placeMaterialOrder(req,res){
    if(req.logInfo.userLogged){
        if(true){
            let materialOrder = new materialOrderModel()
            materialOrder.custId = req.logInfo.userObject._id
            materialOrder.supplierId = req.body.supplierId
            materialOrder.materialId = req.body.materialId
            materialOrder.qty = req.body.qty
            materialOrder.total = req.body.total
            materialOrder.materialName = req.body.materialName
            materialOrder.save().then((result)=>{
            res.send("Order placed successfully. Order number is : "+result._id)
        })}else{
            res.send("please login as a cook to order raw material")
        }
    }else{
        res.send("please login before order")
    }
    
    
}
export function getPlacedMaterialOrder(req,res){
    if(req.logInfo.userLogged){
        if(true){
            materialOrderModel.find({cookId : req.logInfo.userObject._id},{}).then((result)=>{
            res.send(result)
        })}else{
            res.send("please login as a cook view raw material")
        }        
    }else{
        res.send("please login before view placed orders")
    }
}
export function getRecievedMaterialOrders(req,res){
    if(req.logInfo.userLogged){
        if(req.logInfo.userObject.saleAccount){
            materialOrderModel.aggregate([{
                $lookup : {
                    from : "materials",
                    localField : "materialId",
                    foreignField : "_id",
                    as : "materials"
                }
            },{
                $match : {"materials.supplierId" : req.logInfo.userObject._id}
            }]).then((result)=>{
                res.send(result)
            });
        }else{
            res.send("you needs to be registered as a supplier to recieve material orders ")
        }
    }else{
        res.send("please login before view recieved orders")
    }
}
export function getRecived(req,res){
    if(req.logInfo.userLogged){
        materialOrderModel.find({supplierId : req.logInfo.userObject._id}).then((response)=>{
            res.send(response)
        })
    }
    
}