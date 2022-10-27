import asyncHandler from "express-async-handler";
import Volunteer from "../models/volunteerModel.js";
import User from "../models/userModel.js";

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  public

const getVolunteers = asyncHandler(async (req, res) => {
	const volunteers = await Volunteer.find();
	res.status(200).json(volunteers);
});

// @desc    Get volunteer by id
// @route   GET /api/voluunteers/:id
// @access  private

const getVolunteerById = asyncHandler(async (req, res) => {
	const volunteer = await Volunteer.findById(req.params.id);
	if (volunteer) {
		res.json(volunteer);
	} else {
		res.status(404);
		throw new Error("Volunteer not found");
	}
});

// @desc    Get user volunteers
// @route   GET /api/volunteers/myvolunteers
// @access  private

const getMyVolunteers = asyncHandler(async (req, res) => {
	const volunteers = await Volunteer.find({ user: req.user._id });
	res.status(200).json(volunteers);
});

// @desc    Create volunteer
// @route   SET /api/volunteers
// @access  private

const createVolunteer = asyncHandler(async (req, res) => {
	// if (!req.body.title) {
	// 	res.status(400);
	// 	throw new Error("Please add a title");
	// }

	const volunteer = Volunteer.create({
		user: req.user._id,
		name: req.user.name,
		title: req.body.title,
		photo: req.body.photo,
		description: req.body.description,
	});
	res.status(200).json(volunteer);
});

// @desc    Update volunteer
// @route   PUT /api/volunteers/:id
// @access  private

const updateVolunteer = asyncHandler(async (req, res) => {
	const { title, photo, description } = req.body;
	const volunteer = await Volunteer.findById(req.params.id);

	if (volunteer) {
		volunteer.title = title;
		volunteer.photo = photo;
		volunteer.description = description;

		const user = await User.findById(req.user._id);

		// Check if user exists
		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (volunteer.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		const updatedVolunteer = await volunteer.save();
		res.status(200).json(updatedVolunteer);
	} else {
		res.status(404);
		throw new Error("Volunteer not found");
	}
});

// @desc    Delete volunteer
// @route   DELETE /api/volunteers/:id
// @access  private

const deleteVolunteer = asyncHandler(async (req, res) => {
	const volunteer = await Volunteer.findById(req.params.id);

	if (volunteer) {
		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (volunteer.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		await volunteer.remove();
		res.json({ message: "Volunteer deleted" });
	} else {
		res.status(404);
		throw new Error("Volunteer not found");
	}
});

// @desc    Create participant
// @route   POST /api/events/:id
// @access  private

const createVolunteerParticipant = asyncHandler(async (req, res) => {
	const { checked } = req.body;
	const volunteer = await Volunteer.findById(req.params.id);

	if (volunteer) {
		const participant = {
			name: req.user.name,
			checked: checked || volunteer.checked,
			user: req.user._id,
		};

		volunteer.participants.push(participant);

		await volunteer.save();
		res.status(201).json({ message: "Participant checked." });
	} else {
		res.status(404);
		throw new Error("Volunteer not found");
	}
});

export {
	getVolunteers,
	getMyVolunteers,
	createVolunteer,
	updateVolunteer,
	deleteVolunteer,
	getVolunteerById,
	createVolunteerParticipant,
};
