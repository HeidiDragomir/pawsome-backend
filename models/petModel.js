import mongoose from "mongoose";

const petSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		gender: {
			type: String,
			required: [true, "Please add a gender"],
		},
		age: {
			type: Number,
			required: [true, "Please add an age"],
		},
		size: {
			type: String,
			required: [true, "Please add a size"],
		},
		about: {
			type: String,
			required: [true, "Please add some info"],
			maxlength: [1000, "Character can not be more than 1000 characters"],
		},
		photo: {
			type: String,
			required: [true, "Please add a photo"],
		},
		place: {
			type: String,
			required: [true, "Please add a place"],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Pet", petSchema);
