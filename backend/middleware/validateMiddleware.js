// src/middleware/validateMiddleware.js
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message
      });
    }

    req.body = result.data; // Replaces body with parsed/validated data
    next();
  };
}
