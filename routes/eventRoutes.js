import express from "express";
import {
	createEvent,
	deleteEvent,
	getEvents,
	getMyEvents,
	getEventById,
	updateEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEvents);

router.route("/myevents").get(protect, getMyEvents).post(protect, createEvent);

router.get("/:id", protect, getEventById);

router
	.route("/myevents/:id")
	.put(protect, updateEvent)
	.delete(protect, deleteEvent);

export default router;
