import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

// Initialize express
const app = express();

// Parse json objects
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running.");
});

app.use("/api/users", userRoutes);

// Create a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
