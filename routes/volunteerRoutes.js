import express from "express";
import {
	createVolunteer,
	deleteVolunteer,
	getVolunteers,
	getMyVolunteers,
	updateVolunteer,
	getVolunteerById,
	createVolunteerParticipant,
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getVolunteers);

router
	.route("/myvolunteers")
	.get(protect, getMyVolunteers)
	.post(protect, createVolunteer);

router.get("/:id", protect, getVolunteerById);
router.post("/:id/participants", protect, createVolunteerParticipant);

router
	.route("/myvolunteers/:id")
	.put(protect, updateVolunteer)
	.delete(protect, deleteVolunteer);

export default router;
