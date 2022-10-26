import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";

// @desc    Get all questions
// @route   GET /api/questions
// @access  public

const getQuestions = asyncHandler(async (req, res) => {
	const questions = await Question.find();
	res.status(200).json(questions);
});

// @desc    Get event by id
// @route   GET /api/events/:id
// @access  private

const getQuestionById = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id);
	if (question) {
		res.json(question);
	} else {
		res.status(404);
		throw new Error("Question not found");
	}
});

// @desc    Get user questions
// @route   GET /api/questions/myquestions
// @access  private

const getMyQuestions = asyncHandler(async (req, res) => {
	const questions = await Question.find({ user: req.user._id });
	res.status(200).json(questions);
});

// @desc    Create question
// @route   SET /api/questions
// @access  private

const createQuestion = asyncHandler(async (req, res) => {
	// if (!req.body.title) {
	// 	res.status(400);
	// 	throw new Error("Please add a title");
	// }

	const question = new Question({
		user: req.user._id,
		name: req.user.name,
		title: req.body.title,
		photo: req.body.photo,
		description: req.body.description,
	});
	const createdQuestion = await question.save();
	res.status(200).json(createdQuestion);
});

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  private

const updateQuestion = asyncHandler(async (req, res) => {
	const { title, photo, description } = req.body;
	const question = await Question.findById(req.params.id);

	if (question) {
		question.title = title;
		question.photo = photo;
		question.description = description;

		const user = await User.findById(req.user._id);

		// Check if user exists
		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (question.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		const updatedQuestion = await question.save();
		res.status(200).json(updatedQuestion);
	} else {
		res.status(404);
		throw new Error("Question not found");
	}
});

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  private

const deleteQuestion = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id);

	if (question) {
		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (question.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		await question.remove();
		res.json({ message: "Question deleted" });
	} else {
		res.status(404);
		throw new Error("Question not found");
	}
});

// @desc    Create answer
// @route   Post /api/questions/:id/answers
// @access  Private

const createAnswer = asyncHandler(async (req, res) => {
	const { text } = req.body;

	const question = await Question.findById(req.params.id);

	if (question) {
		const answer = {
			name: req.user.name,
			text,
			user: req.user._id,
		};

		question.answers.push(answer);

		await question.save();
		res.status(201).json({ message: "Answer added." });
	} else {
		res.status(404);
		throw new Error("Question not found.");
	}
});

export {
	getQuestions,
	getMyQuestions,
	createQuestion,
	updateQuestion,
	deleteQuestion,
	getQuestionById,
	createAnswer,
};
