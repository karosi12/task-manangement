import express from "express";
import userCtrl from "./user.controller";
const userRouter = express.Router();

userRouter.post("/signup", userCtrl.createAccount);

export default userRouter;
