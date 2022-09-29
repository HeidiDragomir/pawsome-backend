const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

// Initialize express
const app = express();

// Parse json objects
app.use(express.json());

// Create a server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
