import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import Pet from "../models/petModel.js";
import User from "../models/userModel.js";

// @desc    Get all pets
// @route   GET /api/pets
// @access  private

const getPets = asyncHandler(async (req, res) => {
	const pets = await Pet.find();
	res.status(200).json(pets);
});

// @desc    Set pet
// @route   SET /api/pets
// @access  private

const createPet = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error("Please add a name");
	}

	const pet = Pet.create({
		name: req.body.name,
		gender: req.body.gender,
		age: req.body.age,
		size: req.body.size,
		about: req.body.about,
		photo: req.body.photo,
		place: req.body.place,
	});
	res.status(200).json(pet);
});

// @desc    Update pet
// @route   PUT /api/pets/:id
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

		const updatedPet = await pet.save();
		res.status(200).json(updatedPet);
	} else {
		res.status(400);
		throw new Error("Pet not found");
	}
});

// @desc    Delete pet
// @route   DELETE /api/pets/:id
// @access  private

const deletePet = asyncHandler(async (req, res) => {
	const pet = await Pet.findById(req.params.id);

	if (pet) {
		await pet.remove();
		res.json({ message: "Pet deleted" });
	} else {
		res.status(404);
		throw new Error("Pet not found");
	}
});

export { getPets, createPet, updatePet, deletePet };
