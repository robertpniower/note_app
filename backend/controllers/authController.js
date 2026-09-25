// Import the authentication service.
import * as authService from "../services/authService.js";

class AuthController {

  // Handle user registration.
  async register(req, res, next) {
    // Start a try block so unexpected errors can reach the centralized error handler.
    try {
      // Call the service with the validated request data.
      const result = await authService.registerUser(req.body);

      // Return the newly created user and token.
      return res.status(201).json(result);
    } catch (error) {
      // Pass the error to Express error-handling middleware.
      next(error);
    }
  }

  // Handle user login.
  async login(req, res, next) {
    // Start a try block for controlled error handling.
    try {
      // Ask the authentication service to authenticate the user.
      const result = await authService.loginUser(req.body);

      // Return the authenticated user and JWT.
      return res.status(200).json(result);
    } catch (error) {
      // Pass the error to the centralized error handler.
      next(error);
    }
  }

  // Handle requests for the currently authenticated user.
  async me(req, res, next) {
    // Start a try block for error handling.
    try {
      // Get the authenticated user's ID from the authentication middleware.
      const userId = req.userId;

      // Ask the service to retrieve the user.
      const user = await authService.getCurrentUser(userId);

      // Return the user to the client.
      return res.status(200).json({
        // Put the user inside a consistent response object.
        user,
      });
    } catch (error) {
      // Pass the error to the centralized error handler.
      next(error);
    }
  }
}

export default new AuthController();
