// Import Express so we can create a router.
import express from "express";

// Import the authentication controllers.
import authController from "../controllers/authController.js";

import { registerSchema, loginSchema } from "../validators/authValidator.js";

import { validate } from "../middleware/validateMiddleware.js";

// Import the authentication middleware.
import { authenticate } from "../middleware/authMiddleware.js";

// Create a new Express router.
const router = express.Router();

// Register a new user.
router.post("/register", validate(registerSchema), authController.register);

// Authenticate an existing user.
router.post("/login", validate(loginSchema), authController.login);

// Return the currently authenticated user.
router.get("/me", authenticate, authController.me);

// Export the router so app.js can mount it.
export default router;
