// Load environment variables from the .env file.
import "dotenv/config";

// Import the configured Express application.
import app from "./app.js";

// Read the configured port or use 3000 as a fallback.
const PORT = process.env.PORT || 3000;

// Start the Express HTTP server.
app.listen(PORT, () => {
  // Print a message so we know that the server started successfully.
  console.log(`Server running on port ${PORT}`);
});
