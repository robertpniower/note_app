// Centralized Express error-handling middleware.
export function errorHandler(error, req, res, next) {
  // Use the status code supplied by the application error.
  const statusCode = error.statusCode || 500;

  // Log unexpected server errors so they can be investigated.
  if (statusCode >= 500) {
    // Write the complete error to the server console.
    console.error(error);
  }

  // Return a safe error response to the client.
  return res.status(statusCode).json({
    // Use the application error message or a generic message.
    error:
      statusCode >= 500
        ? "Internal server error."
        : error.message,
  });
}
