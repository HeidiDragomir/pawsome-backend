import mongoose from "mongoose";

const petSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		userEmail: {
			type: String,
			ref: "User",
		},
		userDetails: {
			type: String,
			ref: "user",
		},
		name: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
			default: 0,
		},
		size: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			required: true,
			maxlength: [1000, "Character can not be more than 1000 characters"],
		},
		photo: {
			type: String,
			required: true,
		},
		place: {
			type: String,
			required: true,
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
