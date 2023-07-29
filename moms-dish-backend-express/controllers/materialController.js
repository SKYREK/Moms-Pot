import mongoose from "../db/conn.js"
import materialSchema from "../models/material.js"

export const materialModel = mongoose.model('materials',materialSchema)

export function createMaterial(req,res){
    if(req.logInfo.userLogged){
        if(req.logInfo.userObject.saleAccount){
            
            let material = new materialModel()
            material.supplierId = req.logInfo.userObject._id
            material.name = req.body.materialName
            material.description = req.body.description
            material.unit = req.body.unit
            material.quanta = req.body.quanta
            material.price = req.body.price
            material.save().then((materialO)=>{
                res.send("new material created id is :"+ materialO)
            });
        }else{
            res.send("please activate your sale account")
        }
    }else{
        res.send("please login")
    }
}
export function updateMaterial(req,res){
    if(req.logInfo.userLogged){
        materialModel.updateOne({_id : req.body.materialId,supplierId : req.logInfo.userObject._id},{$set : {
            supplierId : req.logInfo.userObject._id,
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            unit : req.body.unit,
            quanta : req.body.quanta,
        }}).then((result)=>{
            res.send(result)
        })        
        
    }else{
        res.send("please login")
    }
}
export function deleteMaterial(req,res){
    if(req.logInfo.userLogged){
        materialModel.deleteOne({_id : req.body.materialId , supplierId : req.logInfo.userObject._id}).then((result)=>{
            res.send(result)
        })
    }else{
        res.send("Please login first")
    }
}
export function getMaterialDetails(req,res){
    materialModel.findById(req.body.materialId).then((material)=>{
        res.send(material)
    }).catch(()=>{
        res.send("error in finding the meterial")
    })
}
export function getMaterialList(req,res){
    
    materialModel.find({},{},{}).then((dishList)=>{
        res.send(dishList)
    }).catch(()=>{
        res.send("error in finding the dish")
    })
}
export function getMaterialByUserId(req,res){
    materialModel.find({supplierId : req.body.supplierId}).then((response)=>{
        res.send(response)
    }).catch((err)=>{
        res.send([])
    })
}
export function getMaterialsByQuery(req,res){
    const regex = new RegExp(req.params.query , 'i')
    materialModel.find({"name" : regex}).limit(5).then((response)=>{
        res.send(response)
    }).catch((err)=>{
        console.log(err)
    })

}