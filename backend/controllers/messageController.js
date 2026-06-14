const Message = require("../models/Message");
const Item = require("../models/Item");

const sendMessage = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).send("Item does not exist");
    }

    const senderId = req.userId;
    const receiverId = req.params.otherUserId;

    if (receiverId === senderId) {
      return res.status(400).send("You cannot message yourself");
    }

    const { message } = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      itemId: item._id,
      message,
    });

    await newMessage.save();

    res.status(201).send("Message sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending message");
  }
};

const getMessages = async (req, res) => {
  try {
    const currentUser = req.userId;
    const otherUser = req.params.otherUserId;

    const messages = await Message.find({
      itemId: req.params.itemId,
      $or: [
        {
          senderId: currentUser,
          receiverId: otherUser,
        },
        {
          senderId: otherUser,
          receiverId: currentUser,
        },
      ],
    })
      .populate("senderId", "name")
      .populate("receiverId", "name")
      .populate("itemId", "title")
      .sort({ createdAt: 1 });

    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching messages");
  }
};

const getMyChats = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.userId },
        { receiverId: req.userId },
      ],
    })
      .populate("itemId", "title")
      .populate("senderId", "name")
      .populate("receiverId", "name")
      .sort({ createdAt: -1 });

    const uniqueChats = [];

    const seen = new Set();

    for (const msg of messages) {

      // Skip chats whose item was deleted
      if (!msg.itemId) {
        continue;
      }

      const otherUser =
        msg.senderId._id.toString() === req.userId
          ? msg.receiverId
          : msg.senderId;

      const key =
        msg.itemId._id.toString() +
        "-" +
        otherUser._id.toString();

      if (!seen.has(key)) {
        seen.add(key);

        uniqueChats.push({
          itemId: msg.itemId._id,
          itemTitle: msg.itemId.title,

          otherUserId: otherUser._id,
          otherUserName: otherUser.name,

          lastMessage: msg.message,
          createdAt: msg.createdAt,
        });
      }
    }

    res.send(uniqueChats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching chats");
  }
};


module.exports = {
  sendMessage,
  getMessages,
  getMyChats,
};