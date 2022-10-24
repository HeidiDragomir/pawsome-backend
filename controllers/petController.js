import asyncHandler from "express-async-handler";
import Pet from "../models/petModel.js";
import User from "../models/userModel.js";

// @desc    Get all pets
// @route   GET /api/pets
// @access  public

const getPets = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				$or: [
					{
						name: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						gender: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						size: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						place: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
				],
		  }
		: {};

	const pets = await Pet.find({ ...keyword });
	res.status(200).json(pets);
});

// @desc    Get pet by id
// @route   GET /api/pets/:id
// @access  private

const getPetById = asyncHandler(async (req, res) => {
	const pet = await Pet.findById(req.params.id);
	if (pet) {
		res.json(pet);
	} else {
		res.status(404);
		throw new Error("Pet not found");
	}
});

// @desc    Get user pets
// @route   GET /api/pets/mypets
// @access  private

const getMyPets = asyncHandler(async (req, res) => {
	const pets = await Pet.find({ user: req.user._id });
	res.status(200).json(pets);
});
// @desc    Set pet
// @route   SET /api/pets
// @access  private

const createPet = asyncHandler(async (req, res) => {
	// if (!req.body.name) {
	// 	res.status(400);
	// 	throw new Error("Please add a name");
	// }

	const { name, gender, age, size, about, photo, place } = req.body;

	const pet = new Pet({
		user: req.user._id,
		name,
		gender,
		age,
		size,
		about,
		photo,
		place,
	});
	const createdPet = await pet.save();
	res.status(200).json(createdPet);
});

// @desc    Update pet
// @route   PUT /api/pets/mypets/:id
// @access  private

const updatePet = asyncHandler(async (req, res) => {
	const { name, gender, age, size, about, photo, place } = req.body;
	const pet = await Pet.findById(req.params.id);

	if (pet) {
		pet.name = name;
		pet.gender = gender;
		pet.age = age;
		pet.size = size;
		pet.about = about;
		pet.photo = photo;
		pet.place = place;

		const user = await User.findById(req.user._id);

		// Check if user exists
		if (!user) {
			res.status(401);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (pet.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		const updatedPet = await pet.save();
		res.status(200).json(updatedPet);
	} else {
		res.status(404);
		throw new Error("Pet not found");
	}
});

// @desc    Delete pet
// @route   DELETE /api/pets/:id
// @access  private

const deletePet = asyncHandler(async (req, res) => {
	const pet = await Pet.findById(req.params.id);

	if (pet) {
		const user = await User.findById(req.user.id);

		// Check if user exists
		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		// Make sure the logged in user matches the pet user
		if (pet.user.toString() !== user.id) {
			res.status(401);
			throw new Error("User not authorized");
		}

		await pet.remove();
		res.json({ message: "Pet deleted" });
	} else {
		res.status(404);
		throw new Error("Pet not found");
	}
});

// @desc    Update petToAdopted
// @route   PUT /api/pets/:id
// @access  public

const updatePetToAdopted = asyncHandler(async (req, res) => {
	const { isAdopted, isFostered, isVirtualAdopted } = req.body;
	const pet = await Pet.findById(req.params.id);

	if (pet) {
		pet.isAdopted = isAdopted || pet.isAdopted;
		pet.isFostered = isFostered || pet.isFostered;
		pet.isVirtualAdopted = isVirtualAdopted || pet.isVirtualAdopted;

		const updatedPet = await pet.save();
		res.status(200).json(updatedPet);
	} else {
		res.status(404);
		throw new Error("Pet not found");
	}
});

export {
	getPets,
	getPetById,
	getMyPets,
	createPet,
	updatePet,
	deletePet,
	updatePetToAdopted,
};
