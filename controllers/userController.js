import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @description Register new user
// @route   POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, isAdmin } = req.body;

	// if (!name || !email || !password || !confirmPassword) {
	// 	res.status(400);
	// 	throw new Error("Please add all fields");
	// }

	// Check if user exists
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error("User already exist");
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = User.create({
		name,
		email,
		password: hashedPassword,
		isAdmin,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @description Authenticate a user
// @route   POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid email or password");
	}
});

// @description Get user data
// @route   GET /api/users/me
// @access Private

const profileUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//// ABOUT ME

// @description Post user details
// @route   POST /api/users/profile/aboutme
// @access Private

const createAboutMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!req.body.details) {
		res.status(400);
		throw new Error("Please add a description");
	}

	if (user) {
		user.details = req.body.details;

		const createdAboutMe = await user.save();
		res.json({
			details: createdAboutMe.details,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @description Get user details
// @route   GET /api/users/profile/aboutme
// @access Private

const getAboutMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			details: user.details,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @description Update user details
// @route   PUT /api/users/profile/aboutme
// @access Private

const updateAboutMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!req.body.details) {
		res.status(400);
		throw new Error("Please add or update a description");
	}

	if (user) {
		user.details = req.body.details || user.details;

		const updatedDetails = await user.save();

		res.json({
			details: updatedDetails.details,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});





// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export {
	registerUser,
	loginUser,
	profileUser,
	createAboutMe,
	getAboutMe,
	updateAboutMe,
};
