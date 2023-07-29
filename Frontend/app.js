import db from "./db/conn.js"
import express from "express"
import userRouter from "./routes/user.js"
import sessions from "express-session"
import cookieParser from "cookie-parser"
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import session from "express-session"
import { validateUserDetails } from "./controllers/userControllers.js"
import dishRouter from "./routes/dish.js"
import orderRouter from "./routes/order.js"
import materialRouter from "./routes/material.js"
import materialOrderRouter from "./routes/materialOrder.js"
import feedbackRouter from "./routes/feedback.js"
import cors from 'cors'
import multer from "multer"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;
app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: true
}));
const dpstorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'images/dps')
    },
    filename : (req,file,cb)=>{
        cb(null, file.originalname)
    }
})
const dpupload = multer({storage : dpstorage})
const dishstorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'images/dishes')
    },
    filename : (req,file,cb)=>{
        cb(null, file.originalname)
    }
})
const dishupload = multer({storage : dishstorage})
const materialstorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'images/materials')
    },
    filename : (req,file,cb)=>{
        cb(null, file.originalname)
    }
})
const materialUpload = multer({storage : materialstorage})

app.use(express.static(__dirname));
app.use(cookieParser());
app.use(validateUserDetails)


app.get("/",(req,res)=>{
    res.send(session.userid)
});
app.get("/dpgetter/:id",(req,res)=>{
    res.sendFile(__dirname+'/images/dps/'+req.params.id+'.jpg')
})
app.get("/dihimggetter/:id",(req,res)=>{
    res.sendFile(__dirname+'/images/dishes/'+req.params.id+'.jpg')
})
app.get("/mimggetter/:id",(req,res)=>{
    res.sendFile(__dirname+'/images/materials/'+req.params.id+'.jpg')
})
app.use('/users',userRouter)
app.use('/dishes',dishRouter)
app.use('/orders',orderRouter)
app.use('/materials',materialRouter)
app.use('/materialOrders',materialOrderRouter)
app.use('/feedbacks',feedbackRouter)
app.post('/dp',dpupload.single('image'),(req,res)=>{
    res.send("success")
})
app.post('/dishImg',dishupload.single('image'),(req,res)=>{
    res.send("success")
})
app.post('/mImg',materialUpload.single('image'),(req,res)=>{
    res.send("success")
})
app.listen(PORT,(error)=>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    }else
        console.log("Error occured, sever can't start",error)
});