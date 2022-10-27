import mongoose from "mongoose";

const participantSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		checked: {
			type: Boolean,
			required: true,
			default: true,
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

const volunteerSchema = mongoose.Schema(
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
		participants: [participantSchema],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Volunteer", volunteerSchema);
