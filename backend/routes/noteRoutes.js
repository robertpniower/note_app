import express from "express";
import noteController from "../controllers/NoteController.js";

const router = express.Router();

// Define routes for /api/notes
router.get("/", (req, res, next) => noteController.getNotes(req, res, next));
router.get("/:id", (req, res, next) => noteController.getSingleNote(req, res, next));
router.post("/", (req, res, next) => noteController.createNote(req, res, next));
router.put("/:id", (req, res, next) => noteController.updateNote(req, res, next));
router.delete("/:id", (req, res, next) => noteController.deleteNote(req, res, next));

export default router;
