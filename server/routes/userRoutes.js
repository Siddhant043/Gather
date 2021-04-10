import express from "express";
import { signin, signup } from "../controllers/userController.js";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(signup);

export default router;
