import express from "express"
import { getUserDetails, loginUser, registerUser, changeUserPassword, updateUserData , logout, deleteAccount, getUserById, doSearch, searchCooks, searchSuppliers, enableCookAccount, enableSaleAccount } from "../controllers/userControllers.js";

const userRouter = express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getUserData',getUserDetails)
userRouter.post('/changeUserPassword',changeUserPassword)
userRouter.put('/updateUserData',updateUserData)
userRouter.post('/logout',logout)
userRouter.delete('/deleteAccount',deleteAccount)
userRouter.post('/byId',getUserById)
userRouter.post('/searchContent',doSearch)
userRouter.get('/searchCook/:query',searchCooks)
userRouter.get('/searchSuppliers/:query',searchSuppliers)
userRouter.get('/enableCook',enableCookAccount)
userRouter.get('/enableSupplier',enableSaleAccount)
export default userRouter;