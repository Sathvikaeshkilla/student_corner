const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
   sendMessage,
   getMessages,
   getMyChats
} = require("../controllers/messageController");

router.post(
   "/messages/:itemId",
   authMiddleware,
   sendMessage
);

router.get(
   "/messages/:itemId",
   authMiddleware,
   getMessages
);

router.get(
   "/my-chats",
   authMiddleware,
   getMyChats
);


module.exports = router;