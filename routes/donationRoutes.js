import express from "express";
import {
	createDonation,
	deleteDonation,
	getDonations,
	getMyDonations,
	updateDonation,
	getDonationById,
} from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDonations);

router
	.route("/mydonations")
	.get(protect, getMyDonations)
	.post(protect, createDonation);

router.get("/:id", protect, getDonationById);

router
	.route("/mydonations/:id")
	.put(protect, updateDonation)
	.delete(protect, deleteDonation);

export default router;
