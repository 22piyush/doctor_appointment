import express from "express";
import registerUser from "../controllers/userController.js";


const userRouter = express.Router()
userRouter.get('/register-user', registerUser);

export default userRouter;