import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getMessages,
  sendMessage,
} from "../api/messageApi";
import AuthContext from "../context/AuthContext";

function Chat() {
  const { itemId, otherUserId } = useParams();

  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await getMessages(
        itemId,
        otherUserId
      );

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchMessages();

  const interval = setInterval(() => {
    fetchMessages();
  }, 3000);

  return () => clearInterval(interval);
}, [itemId, otherUserId]);

  const handleSend = async () => {
    try {
      if (!newMessage.trim()) return;

      await sendMessage(
        itemId,
        otherUserId,
        newMessage
      );

      setNewMessage("");

      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">

       <h1 className="text-3xl font-bold">
  {messages[0]?.itemId?.title || "Chat"}
</h1>

<p className="text-gray-600 mb-6">
  Chat with{" "}
  {messages.length > 0 &&
    (messages[0].senderId._id === user?._id
      ? messages[0].receiverId.name
      : messages[0].senderId.name)}
</p>

        <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">

          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((msg) => {
              const isMe =
                msg.senderId._id === user?._id;

              return (
                <div
                  key={msg._id}
                  className={`flex mb-3 ${
                    isMe
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-sm px-4 py-3 rounded-2xl ${
                      isMe
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1">
                      {msg.senderId.name}
                    </p>

                    <p>{msg.message}</p>
                  </div>
                </div>
              );
            })
          )}

        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type message..."
            value={newMessage}
            onChange={(e) =>
              setNewMessage(e.target.value)
            }
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;