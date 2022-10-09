import express from "express";
import {
	createVolunteer,
	deleteVolunteer,
	getVolunteers,
	getMyVolunteers,
	updateVolunteer,
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getVolunteers);

router
	.route("/myvolunteers")
	.get(protect, getMyVolunteers)
	.post(protect, createVolunteer);

router
	.route("/myvolunteers/:id")
	.put(protect, updateVolunteer)
	.delete(protect, deleteVolunteer);

export default router;
