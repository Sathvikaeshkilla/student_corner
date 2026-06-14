import { useEffect, useState } from "react";
import { getMyChats } from "../api/messageApi";
import { useNavigate } from "react-router-dom";

function MyChats() {
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getMyChats();

        setChats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Chats
        </h1>

        {chats.length === 0 ? (
          <p>No chats yet.</p>
        ) : (
          chats.map((chat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-5 mb-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold">
                {chat.itemTitle}
              </h2>

              <p className="text-gray-600 mt-1">
                Chat with: {chat.otherUserName}
              </p>

              <p className="text-gray-700 mt-3">
                Last Message:
              </p>

              <p className="italic text-gray-500">
                {chat.lastMessage}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/chat/${chat.itemId}/${chat.otherUserId}`
                  )
                }
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Open Chat
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default MyChats;