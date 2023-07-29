import mongoose from "../db/conn.js"
import userSchema from "../models/user.js"
import crypto from "crypto"
import { dishModel } from "./dishControllers.js";
import { materialModel } from "./materialController.js";


const userModel = mongoose.model('Users',userSchema)


function hashPasswordNew(password){
    return crypto.pbkdf2Sync(password, "no_salt",  
        1000, 64, `sha512`).toString(`hex`); 
    
}

export function registerUser(req,res){
    
    let user  = new userModel()    
    
    let userJson = req.body
    console.log(req.body)
    user.email = req.body.email
    user.passwordHash = hashPasswordNew(req.body.password)    
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.location = req.body.location
    user.cookAccount = req.body.cookEnabled
    user.saleAccount = req.body.saleEnabled
    user.save().then((userO)=>{
        res.send(userO._id)
    })

}
export function loginUser(req,res){
    let result = {
        validated : false,
        status : "user_not_found",
        id    : ""
    }
    userModel.findOne({email : req.body.email}).then((model)=>{
        if(model != null){
            result.status = "incorrect_password" 

            if(model.passwordHash == hashPasswordNew(req.body.password)){                
                req.session.userid = model._id
                req.logInfo.userLogged = true
                result.status = "correct_password"
                result.validated = true    
                result.id = model._id                          
            }
        }
        res.json(result)

    });     
}
export function getUserDetails(req,res){
    
    if(req.logInfo.userLogged){
        userModel.findOne({_id : req.logInfo.userObject._id}).then((model)=>{
            if(model != null){
                res.send(model)
            }
        }); 
    }else{
        res.send(false)
    }
    
}
export function changeUserPassword(req,res){

    if(req.logInfo.userLogged){
        userModel.updateOne({_id : req.logInfo.userObject._id},{$set:{passwordHash : hashPasswordNew(req.body.newPassword)}}).then((res)=>{
            
        })
        res.send("password change successful")
    }else{
        res.send("please log in first")
    }

    
}

export function updateUserData(req,res){
    
    if(req.logInfo.userLogged){
        
        userModel.updateOne({_id : req.logInfo.userObject._id},{$set:{
            email:req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            location : req.body.location,
            cookAccount : req.body.cookEnabled,
            saleAccount : req.body.saleEnabled
        
        }}).then((result)=>{
            res.send("information change successful")
        })
        
    }else{
        res.send("please log in first")
    }
}
export function validateUserDetails(req,res,next){
   
    const uid = req.session.userid
    req.logInfo = {
        userLogged : false,
        userObject : null
    }

    if(uid){   
        req.logInfo.userLogged = true 

        userModel.findOne({_id : uid}).then((model)=>{

            if(model != null){                
                req.logInfo.userObject = model
                next()                  
            }
        }); 
        
    }else{
        next()
    }
  
      
}
export function deleteAccount(req,res){
    if(req.logInfo.userLogged){
        userModel.deleteOne({_id : req.logInfo.userObject._id}).then(()=>{
            
            req.session.destroy((result)=>{
                console.log("session ended")
                res.send("deletion successful")
            })
        })
    }else{
        res.send("No user accounts found")
    }
    
}
export function logout(req,res){
    if(req.logInfo.userLogged){         
        
        req.session.destroy((result)=>{
            console.log("session ended") 
            res.send("logged out successfully")   
        })
    }else{
        res.send("No user accounts found")
    }
}
export function getUserById(req,res){
    
    userModel.findById(req.body.cookId).then(
        (response)=>{
            res.json(response)        
        }
    )
}

export function doSearch(req , res){
    const result = {}
    
    materialModel.find({name : req.body.query}).then((response)=>{
        result.materials = response
        
        dishModel.find({name : req.body.query}).then((response)=>{
            response.map((dish,index)=>{
                userModel.findOne({_id : dish.cookId}).then((cookResponse)=>{
                    //this part didnt work
                    response[index].cook = cookResponse
                    result.dishes = response
                    if(index == (response.length-1)){
                        res.send(result)
                    }                               
                })
            })
        })
    })
    
}
export function searchCooks(req,res){
    const regex = new RegExp(req.params.query , 'i')
   
    userModel.find({$or : [{firstName : regex , cookAccount : true}, {lastName : regex , cookAccount : true}]}).limit(5).then((response)=>{
        res.send(response)
    }).catch((err)=>{
        console.log(err)
    })

}
export function searchSuppliers(req,res){
    const regex = new RegExp(req.params.query , 'i')
   
    userModel.find({$or : [{firstName : regex , saleAccount : true}, {lastName : regex , saleAccount : true}]}).limit(5).then((response)=>{
        res.send(response)
    }).catch((err)=>{
        console.log(err)
    })
}
export function enableCookAccount(req,res){
    if(req.logInfo.userLogged){
        userModel.updateOne({_id : req.logInfo.userObject._id},{$set:{cookAccount : true}}).then((result)=>{
        res.send(true)
    })}else{
        res.send(false)
    }
}
export function enableSaleAccount(req,res){
    if(req.logInfo.userLogged){
        userModel.updateOne({_id : req.logInfo.userObject._id},{$set:{saleAccount : true}}).then((result)=>{
        res.send(true)
    })}else{
        res.send(false)
    }
}
