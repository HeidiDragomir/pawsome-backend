import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @description Register new user
// @route   POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

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
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
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
// @route   GET /api/users/profile
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

// @description Update user data
// @route   PUT /api/users/profile
// @access Private

const updateProfileUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
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

// @description Create new user by admin
// @route   POST /api/users/admin
// @access Admin

const registerUserAdmin = asyncHandler(async (req, res) => {
	const { name, email, password, isAdmin } = req.body;
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
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
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @description Get all users
// @route   GET /api/users
// @access Admin

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find();
	res.json(users);
});

// @description Get user by id
// @route   GET /api/users/:id
// @access Admin

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @description Update user
// @route   PUT /api/users/:id
// @access Admin

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @description Delete user
// @route   DELETE /api/users/:id
// @access Admin

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await user.remove();
		res.json({ message: "User deleted" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
	res.json(user);
});

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export {
	registerUser,
	loginUser,
	profileUser,
	updateProfileUser,
	createAboutMe,
	getAboutMe,
	updateAboutMe,
	registerUserAdmin,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};
