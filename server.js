import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();

connectDB();

// Initialize express
const app = express();

// Parse json objects
app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

app.get("/", (req, res) => {
	res.send("API is running.");
});

app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/questions", questionRoutes);

app.use(notFound);
app.use(errorHandler);

// Create a server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));
