import mongoose from "../db/conn.js";
import feedbackSchema from "../models/feedback.js";

const feedBackModel = mongoose.model("feedbacks",feedbackSchema)

export function createFeedBack(req,res){
    if(req.logInfo.userLogged){
        let feedback = new feedBackModel()
        feedback.userId = req.logInfo.userObject._id
        feedback.dishId = req.body.dishId
        feedback.rating = req.body.rating
        feedback.description = req.body.description
        feedback.save().then((result)=>{
            res.send(result._id)
        })

    }else{
        res.send("please login before posting a feedback");
    }
}
export function findFeedbacksForDish(req,res){
    feedBackModel.find({dishId : req.body.dishId}).then((result)=>{
        res.send(result)
    })
}
export function updateFeedback(req,res){
    if(req.logInfo.userLogged){
        feedBackModel.updateOne({_id : req.body.feedbackId, userId : req.logInfo.userObject._id},{$set:{
            description : req.body.description,
            rating : req.body.rating
        }}).then((result)=>{
            res.send(result)
        })
    }else{
        res.send("please login before edit a feedback");
    }
}
export function deleteFeedBack(req,res){
    if(req.logInfo.userLogged){
        feedBackModel.deleteOne({_id : req.body.feedbackId, userId : req.logInfo.userObject._id}).then((result)=>{
            res.send(result)
        })
    }else{
        res.send("please login before delete a feedback");
    }
}
export function findFeedbackFromCook(req,res){    
        
    feedBackModel.aggregate([{
        $lookup : {
            from : "dishes",
            localField : "dishId",
            foreignField : "_id",
            as : "dish"
        }
    },{
        $match : {"dish.cookId" : new mongoose.Types.ObjectId(req.body.cookId)}
    }]).then((result)=>{
        res.send(result)
    });
      
}
export function getAverageRating(req,res){
    feedBackModel.find({dishId : req.params.id}).then((result)=>{
        let total = 0
        result.map((item,index)=>{
            total += item.rating
        })
        console.log(result)
       
        res.send({avg : (total/result.length)})
        
    })
}