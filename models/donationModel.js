import mongoose from "mongoose";

const donationSchema = mongoose.Schema({
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
	isNeeded: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export default mongoose.model("Donation", donationSchema);
