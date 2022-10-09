import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	title: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
		required: false,
	},
});

export default mongoose.model("Problem", problemSchema);
