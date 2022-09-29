import express from "express";
import {
	registerUser,
	loginUser,
	getMe,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);

export default router;
