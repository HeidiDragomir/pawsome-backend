import asyncHandler from "express-async-handler";
import Donation from "../models/donationModel.js";
import User from "../models/userModel.js";

// @desc    Get all donations
// @route   GET /api/donations
// @access  public

const getDonations = asyncHandler(async (req, res) => {
	const donations = await Donation.find();
	res.status(200).json(donations);
});

// @desc    Get donation by id
// @route   GET /api/donations/:id
// @access  private

const getDonationById = asyncHandler(async (req, res) => {
	const donation = await Donation.findById(req.params.id);
	if (donation) {
		res.json(donation);
	} else {
		res.status(404);
		throw new Error("Donation not found");
	}
});

// @desc    Get user donations
// @route   GET /api/donations/mydonations
// @access  private

const getMyDonations = asyncHandler(async (req, res) => {
	const donations = await Donation.find({ user: req.user._id });
	res.status(200).json(donations);
});

// @desc    Create donation
// @route   SET /api/donations
// @access  private

const createDonation = asyncHandler(async (req, res) => {
	// if (!req.body.title) {
	// 	res.status(400);
	// 	throw new Error("Please add a title");
	// }

	const donation = Donation.create({
		user: req.user._id,
		title: req.body.title,
		photo: req.body.photo,
		description: req.body.description,
	});
	res.status(200).json(donation);
});

// @desc    Update donation
// @route   PUT /api/donations/:id
// @access  private

const updateDonation = asyncHandler(async (req, res) => {
	const { title, photo, description } = req.body;
	const donation = await Donation.findById(req.params.id);

	if (donation) {
		donation.title = title;
		donation.photo = photo;
		donation.description = description;

		const user = await User.findById(req.user._id);

		// Check if user exists
		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (donation.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		const updatedDonation = await donation.save();
		res.status(200).json(updatedDonation);
	} else {
		res.status(404);
		throw new Error("Donation not found");
	}
});

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  private

const deleteDonation = asyncHandler(async (req, res) => {
	const donation = await Donation.findById(req.params.id);

	if (donation) {
		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (donation.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		await donation.remove();
		res.json({ message: "Donation deleted" });
	} else {
		res.status(404);
		throw new Error("Donation not found");
	}
});

export {
	getDonations,
	getMyDonations,
	createDonation,
	updateDonation,
	deleteDonation,
	getDonationById,
};
