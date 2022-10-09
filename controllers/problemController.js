import asyncHandler from "express-async-handler";
import Problem from "../models/problemModel.js";
import User from "../models/userModel.js";

// @desc    Get all problems
// @route   GET /api/problems
// @access  public

const getProblems = asyncHandler(async (req, res) => {
	const problems = await Problem.find();
	res.status(200).json(problems);
});

// @desc    Get user problems
// @route   GET /api/problems/myproblems
// @access  private

const getMyProblems = asyncHandler(async (req, res) => {
	const problems = await Problem.find({ user: req.user.id });
	res.status(200).json(problems);
});

// @desc    Create problem
// @route   SET /api/problems
// @access  private

const createProblem = asyncHandler(async (req, res) => {
	if (!req.body.title) {
		res.status(400);
		throw new Error("Please add a title");
	}

	const problem = Problem.create({
		user: req.user.id,
		title: req.body.title,
		photo: req.body.photo,
		description: req.body.description,
		answer: req.body.answer,
	});
	res.status(200).json(problem);
});

// @desc    Update problem
// @route   PUT /api/problems/:id
// @access  private

const updateProblem = asyncHandler(async (req, res) => {
	const { title, photo, description, answer } = req.body;
	const problem = await Problem.findById(req.params.id);

	if (problem) {
		problem.title = title;
		problem.photo = photo;
		problem.description = description;
		problem.answer = answer;

		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (problem.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		const updatedProblem = await problem.save();
		res.status(200).json(updatedProblem);
	} else {
		res.status(404);
		throw new Error("Problem not found");
	}
});

// @desc    Delete problem
// @route   DELETE /api/problems/:id
// @access  private

const deleteProblem = asyncHandler(async (req, res) => {
	const problem = await Problem.findById(req.params.id);

	if (problem) {
		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (problem.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		await problem.remove();
		res.json({ message: "Problem deleted" });
	} else {
		res.status(404);
		throw new Error("Problem not found");
	}
});

export {
	getProblems,
	getMyProblems,
	createProblem,
	updateProblem,
	deleteProblem,
};
