// Import the JWT verification utility.
import { verifyToken } from "../utils/jwt.js";

// Authenticate requests that require a logged-in user.
export function authenticate(req, res, next) {
  // Read the Authorization header from the HTTP request.
  const authorizationHeader = req.headers.authorization;

  // Reject the request when the Authorization header is missing.
  if (!authorizationHeader) {
    // Return an HTTP 401 response because authentication was not provided.
    return res.status(401).json({
      // Provide a safe error message to the client.
      error: "Authentication required.",
    });
  }

  // Split the header into the authentication scheme and token.
  const [scheme, token] = authorizationHeader.split(" ");

  // Make sure the request uses the Bearer authentication scheme.
  if (scheme !== "Bearer" || !token) {
    // Return a 401 response when the header format is invalid.
    return res.status(401).json({
      // Tell the client that the authentication format is invalid.
      error: "Invalid authentication format.",
    });
  }

  // Start a try block because token verification can throw an error.
  try {
    // Verify the JWT and decode its payload.
    const payload = verifyToken(token);

    // Store the authenticated user's ID on the request object.
    req.userId = payload.userId;

    // Continue to the next middleware or controller.
    next();
  } catch (error) {
    // Reject invalid or expired tokens.
    return res.status(401).json({
      // Do not expose the internal JWT error.
      error: "Invalid or expired token.",
    });
  }
}
