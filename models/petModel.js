import mongoose from "mongoose";

const petSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
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
		isAdopted: {
			type: Boolean,
			required: true,
			default: false,
		},
		isFostered: {
			type: Boolean,
			required: true,
			default: false,
		},
		isVirtualAdopted: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Pet", petSchema);
