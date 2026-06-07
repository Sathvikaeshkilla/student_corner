const express = require("express");

const router = express.Router();

const { login,signup,getProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/signup",signup);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;