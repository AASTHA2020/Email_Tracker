import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import JobRoutes from "./routes/JobRoutes.js";
import SendEmailRoutes from "./routes/SendEmailRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
}));

// Getting environment variables.
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB.
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

connectToMongoDB();

app.get("/", async (req, res) => {
    res.json({
        routes: {
            "/jobs": "Get all emails who are seeking for jobs.",
            "/jobs/addMail": "Add a new mail.",
            "/jobs/deleteMail": "Delete a mail.",
            "/jobs/updateMail": "Update a mail.",
            "/sendEmail": "Send emails.",
        }
    })
});

app.use("/jobs", JobRoutes);
app.use("/sendEmail", SendEmailRoutes);

app.listen(port, () => {
    console.log("Server is running on port", port);
});
