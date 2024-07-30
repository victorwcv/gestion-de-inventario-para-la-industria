import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRoutes from "./routes/test.route.js";
import authRoutes from "./routes/auth.route.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// App config
dotenv.config();
const app = express();

// CORS config
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_ORIGIN : process.env.LOCAL_ORIGIN,
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Variables
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

// Conection to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error.message));

// App routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
