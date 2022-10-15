import express from "express";
import {
	createQuestion,
	deleteQuestion,
	getQuestions,
	getMyQuestions,
	updateQuestion,
	getQuestionById,
} from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getQuestions);

router
	.route("/myquestions")
	.get(protect, getMyQuestions)
	.post(protect, createQuestion);

router.get("/:id", protect, getQuestionById);

router
	.route("/myquestions/:id")
	.put(protect, updateQuestion)
	.delete(protect, deleteQuestion);

export default router;
