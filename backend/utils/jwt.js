import jwt from "jsonwebtoken";

export function createToken(user_Id) {
  // Sign a token using the user ID and the secret stored in the environment.
  return jwt.sign(
    // Store only the information we need to identify the user.
    { userId },

    // Use the secret from the environment to sign the token.
    process.env.JWT_SECRET,

    // Configure how long the token remains valid.
    { expiresIn: "1h" },
  );
}

// verify a JWT and return its decoded payload
export function verifyToken(token) {
  // ask jwt to verify that the token was correctly signed.

  return jwt.verify(token, process.env.JWT_SECRET);
}
