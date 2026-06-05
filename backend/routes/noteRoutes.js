const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { uploadNote,getNotes,getNoteById,getMyNotes,deleteNote } = require("../controllers/noteController");

router.post("/notes", authMiddleware, uploadNote);
router.get("/notes",getNotes);
router.get("/notes/:id",getNoteById);
router.get("/my-notes", authMiddleware,getMyNotes);
router.delete("/notes/:id", authMiddleware, deleteNote);
module.exports = router;
