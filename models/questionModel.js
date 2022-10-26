import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const questionSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: false,
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
		answers: [answerSchema],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Question", questionSchema);
