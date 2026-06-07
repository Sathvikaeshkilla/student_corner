const Message = require("../models/Message");
const Item = require("../models/Item");

const sendMessage = async (req, res) => {
   try {

      const item = await Item.findById(req.params.itemId);

      if (!item) {
         return res.send("Item does not exist");
      }

      const senderId = req.userId;
      const receiverId = item.owner;

      if (receiverId.toString() === senderId) {
         return res.send("You cannot message yourself");
      }

      const { message } = req.body;

      const newMessage = new Message({
         senderId,
         receiverId,
         itemId: item._id,
         message
      });

      await newMessage.save();

      res.send("Message sent successfully");

   } catch (error) {

      console.log(error);
      res.send("Error sending message");

   }
};


const getMessages = async (req, res) => {
   try {

      const messages = await Message.find({
         itemId: req.params.itemId,
         $or: [
            { senderId: req.userId },
            { receiverId: req.userId }
         ]
      }).sort({ createdAt: 1 });

      res.send(messages);

   } catch (error) {

      console.log(error);
      res.send("Error fetching messages");

   }
};


const getMyChats = async (req, res) => {
   try {

      const chats = await Message.find({
         $or: [
            { senderId: req.userId },
            { receiverId: req.userId }
         ]
      }).sort({ createdAt: -1 });

      res.send(chats);

   } catch (error) {

      console.log(error);
      res.send("Error fetching chats");

   }
};






module.exports = {
   sendMessage,
   getMessages,
   getMyChats
};

