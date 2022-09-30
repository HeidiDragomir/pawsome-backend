import express from "express";
import {
	createPet,
	deletePet,
	getPets,
	updatePet,
} from "../controllers/petController.js";

const router = express.Router();

router.route("/").get(getPets).post(createPet);

router.route("/:id").put(updatePet).delete(deletePet);

export default router;
