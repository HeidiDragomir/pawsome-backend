import express from "express";
import {
	createPet,
	deletePet,
	getPets,
	getPetById,
	getMyPets,
	updatePet,
} from "../controllers/petController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPets);

router.route("/mypets").get(protect, getMyPets).post(protect, createPet);

router.get("/:id", protect, getPetById);

router.route("/mypets/:id").put(protect, updatePet).delete(protect, deletePet);

export default router;
