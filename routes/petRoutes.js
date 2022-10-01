import express from "express";
import {
	createPet,
	deletePet,
	getPets,
	getMyPets,
	updatePet,
} from "../controllers/petController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPets)

router.route("/mypets").get(protect, getMyPets).post(protect, createPet);

router.route("/mypets/:id").put(protect, updatePet).delete(protect, deletePet);

export default router;
