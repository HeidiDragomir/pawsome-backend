import mongoose from "mongoose";

const volunteerSchema = mongoose.Schema(
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
		isHelped: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Volunteer", volunteerSchema);
