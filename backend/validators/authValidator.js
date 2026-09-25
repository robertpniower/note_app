// Validate the data required to register a new user.
import { z } from "zod";

// Define the schema for registering a new user
const registerSchema = z.object({
  name: z.string({
    required_error: "Name is required.",
    invalid_type_error: "Name must be a string.",
  }).min(1, "Name is required."),

  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string.",
  })
    .email("Invalid email address."),

  password: z.string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a string.",
  })
    .min(8, "Password must contain at least 8 characters."),
});

// Define the schema for logging in
const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string.",
  })
    .min(1, "Email is required."),

  password: z.string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a string.",
  })
    .min(1, "Password is required."),
});

// Exported validation function for registration
export function validateRegisterInput(data) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    // Extract the first error message from Zod's error issues
    const errorMessage = result.error.issues[0].message;

    const error = new Error(errorMessage);
    error.statusCode = 400;
    throw error;
  }

  // Optionally return the parsed/sanitized data
  return result.data;
}

// Exported validation function for login
export function validateLoginInput(data) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;

    const error = new Error(errorMessage);
    error.statusCode = 400;
    throw error;
  }

  return result.data;
}

// Export the schemas for use in other parts of the application
export { registerSchema, loginSchema };
