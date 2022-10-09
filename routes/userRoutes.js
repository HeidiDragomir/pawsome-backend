import express from "express";
import {
	registerUser,
	loginUser,
	profileUser,
	updateProfileUser,
	createAboutMe,
	getAboutMe,
	updateAboutMe,
	registerUserAdmin,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} from "../controllers/userController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);

router.post("/login", loginUser);
router
	.route("/profile")
	.get(protect, profileUser)
	.put(protect, updateProfileUser);

router
	.route("/profile/aboutme")
	.post(protect, createAboutMe)
	.get(protect, getAboutMe)
	.put(protect, updateAboutMe);

router.route("/admin").post(protect, isAdmin, registerUserAdmin);

router
	.route("/:id")
	.get(protect, isAdmin, getUserById)
	.put(protect, isAdmin, updateUser)
	.delete(protect, isAdmin, deleteUser);

export default router;
