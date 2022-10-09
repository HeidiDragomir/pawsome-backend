import express from "express";
import {
	registerUser,
	loginUser,
	profileUser,
	createAboutMe,
	getAboutMe,
	updateAboutMe
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profileUser);
router
	.route("/profile/aboutme")
	.post(protect, createAboutMe)
	.get(protect, getAboutMe)
	.put(protect, updateAboutMe);

export default router;
