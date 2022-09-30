import express from "express";
// import { getPets } from "../controllers/petController.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({ message: "Get pets" });
});

router.post("/", (req, res) => {
	res.status(200).json({ message: "Create pet" });
});

router.put("/:id", (req, res) => {
	res.status(200).json({ message: `Update pet ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
	res.status(200).json({ message: `Delete pet ${req.params.id}` });
});

export default router;
