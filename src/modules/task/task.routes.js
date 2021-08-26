import express from "express";
import taskCtrl from "./task.controller";
const taskRouter = express.Router();

taskRouter.post("/", taskCtrl.createTask);
taskRouter.patch("/:id", taskCtrl.updateTask);
taskRouter.get("/:id", taskCtrl.findTask);
taskRouter.delete("/:id", taskCtrl.deleteTask);

export default taskRouter;
