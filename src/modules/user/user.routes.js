import express from "express";
import userCtrl from "./user.controller";
const userRouter = express.Router();

userRouter.post("/signup", userCtrl.createAccount);
userRouter.post("/login", userCtrl.login);

export default userRouter;
