// Import Express.
import express from "express";

// Import CORS middleware.
import cors from "cors";

// Import the authentication routes.
import authRoutes from "./routes/authRoutes.js";

// Import the centralized error handler.
import { errorHandler } from "./middleware/errorMiddleware.js";

// Create the Express application.
const app = express();

// Enable JSON request-body parsing.
app.use(express.json());

// Enable CORS so the React frontend can communicate with the backend.
app.use(cors());

// Mount authentication endpoints under /api/auth.
app.use("/api/auth", authRoutes);

// Add the centralized error handler after all routes.
app.use(errorHandler);

// Export the configured Express application.
export default app;
