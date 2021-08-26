import express from "express";
const router = express.Router();
import user from "../user/user.routes";

router.get("/", (req, res) =>
  res.status(200).json({ message: "API is running" })
);

router.use("/", user);
export default router;
