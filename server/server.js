import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

// Inititalize express app
const app = express();

// Connect to Database
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Server is running");
})

const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
