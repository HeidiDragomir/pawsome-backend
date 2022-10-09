import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

// @desc    Get all events
// @route   GET /api/events
// @access  public

const getEvents = asyncHandler(async (req, res) => {
	const events = await Event.find();
	res.status(200).json(events);
});

// @desc    Get user events
// @route   GET /api/events/myevents
// @access  private

const getMyEvents = asyncHandler(async (req, res) => {
	const events = await Event.find({ user: req.user.id });
	res.status(200).json(events);
});

// @desc    Create event
// @route   SET /api/events
// @access  private

const createEvent = asyncHandler(async (req, res) => {
	if (!req.body.title) {
		res.status(400);
		throw new Error("Please add a title");
	}

	const event = Event.create({
		user: req.user.id,
		title: req.body.title,
		photo: req.body.photo,
		description: req.body.description,
	});
	res.status(200).json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  private

const updateEvent = asyncHandler(async (req, res) => {
	const { title, photo, description } = req.body;
	const event = await Event.findById(req.params.id);

	if (event) {
		event.title = title;
		event.photo = photo;
		event.description = description;

		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (event.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		const updatedEvent = await event.save();
		res.status(200).json(updatedEvent);
	} else {
		res.status(404);
		throw new Error("Event not found");
	}
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  private

const deleteEvent = asyncHandler(async (req, res) => {
	const event = await Event.findById(req.params.id);

	if (event) {
		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (event.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		await event.remove();
		res.json({ message: "Event deleted" });
	} else {
		res.status(404);
		throw new Error("Event not found");
	}
});

export { getEvents, getMyEvents, createEvent, updateEvent, deleteEvent };