
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const { uploadPYQ,getPYQs,getPYQById,getMyPYQs,deletePYQ } = require("../controllers/PYQController");



router.post("/pyqs", authMiddleware, uploadPYQ);

router.get("/pyqs", getPYQs);

router.get("/pyqs/:id", getPYQById);

router.get("/my-pyqs", authMiddleware, getMyPYQs);

router.delete("/pyqs/:id", authMiddleware, deletePYQ);

module.exports = router;