import bcrypt from "bcrypt";
import UserRepository from "../repositories/userRepository.js";
import { createToken } from "../utils/jwt.js";


class AuthService {

  async registerUser({ name, email, password }) {
    // Normalize the email so that accidental uppercase letters do not create duplicate accounts.
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await UserRepository.findUserByEmail(normalizedEmail);

    if (existingUser) {
      const error = new Error("Email is already registered.");
      error.statusCode = 409;
      throw error;
    }
    // Hash the user's password before storing it.
    const passwordHash = await bcrypt.hash(password, 12);

    // Create the user through the repository.
    const user = await UserRepository.createUser(
      // Pass the user's name.
      name.trim(),

      // Pass the normalized email.
      normalizedEmail,

      // Pass the secure password hash instead of the original password.
      passwordHash,
    );

    // Create a JWT for the newly registered user.
    const token = createToken(user.id);

    // Return only data that the client is allowed to receive.
    return {
      user,
      token,
    };
  }

  async loginUser({ emil, password }) {
    // Normalize the email before searching for the account.
    const normalizedEmail = email.trim().toLowerCase();

    // Search for the user by email.
    const user = await UserRepository.findUserByEmail(normalizedEmail);

    // Reject the login when the user does not exist.
    if (!user) {
      // Create a generic authentication error.
      const error = new Error("Invalid email or password.");

      // Use 401 because authentication failed.
      error.statusCode = 401;

      // Stop processing.
      throw error;
    }

    // Compare the supplied password with the stored password hash.
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    // Reject the login when the passwords do not match.
    if (!passwordMatches) {
      // Create the same generic authentication error.
      const error = new Error("Invalid email or password.");

      // Use 401 because authentication failed.
      error.statusCode = 401;

      // Stop processing.
      throw error;
    }

    // Create a JWT for the authenticated user.
    const token = createToken(user.id);

    // Remove the password hash before returning the user.
    const safeUser = {
      // Return the database ID.
      id: user.id,

      // Return the user's name.
      name: user.name,

      // Return the user's email.
      email: user.email,
    };

    // Return the safe user and authentication token.
    return {
      user: safeUser,
      token,
    };
  }

async getCurrentUser(user_Id) {
  // Find the user using the Id extracted from the JWT.
  const user = UserRepository.findUserById(user_Id);

  // Reject the request when the user does not exist.
  if (!user) {
    // create an authentication error.
    const error = new Error("User not found.");

    // return 404 because the request user does not exist.
    error.statusCode = 404;

    // stop processing
    throw error;
  }

  // return the user
  return user;
}
}

export default new AuthService();
