import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
	{
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
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Question", questionSchema);
