import express from "express";
import {
	createProblem,
	deleteProblem,
	getProblems,
	getMyProblems,
	updateProblem,
} from "../controllers/problemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProblems);

router
	.route("/myproblems")
	.get(protect, getMyProblems)
	.post(protect, createProblem);

router
	.route("/myproblems/:id")
	.put(protect, updateProblem)
	.delete(protect, deleteProblem);

export default router;
