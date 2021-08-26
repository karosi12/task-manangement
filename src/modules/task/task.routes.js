import express from "express";
import taskCtrl from "./task.controller";
const taskRouter = express.Router();

taskRouter.post("/", taskCtrl.createTask);

export default taskRouter;
