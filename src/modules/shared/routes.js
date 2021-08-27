import express from "express";
const router = express.Router();
import authenticate from "./middlewares/authenticate";
import user from "../user/user.routes";
import task from "../task/task.routes";

router.get("/", (req, res) =>
  res.status(200).json({ message: "API is running" })
);

router.use("/", user);
router.use("/task", authenticate, task);
export default router;
