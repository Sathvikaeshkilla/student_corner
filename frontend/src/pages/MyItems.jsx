import { useEffect, useState } from "react";
import {
  getMyItems,
  deleteItem,
  markItemSold,
} from "../api/itemApi";

function MyItems() {
  const [items, setItems] = useState([]);

  const fetchMyItems = async () => {
    try {
      const response = await getMyItems();
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);

      alert("Item deleted successfully");

      fetchMyItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkSold = async (itemId) => {
    try {
      await markItemSold(itemId);

      alert("Item marked as sold");

      fetchMyItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Items
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No items uploaded yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4"
/>
                <h2 className="text-xl font-semibold mb-2">
                  {item.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>

                <div className="space-y-1 mb-4">
                 {item.type === "sell" ? ( <p>
    <span className="font-semibold">
      Price:
    </span>{" "}
    ₹{item.price}
  </p>
) : (
  <p>
    <span className="font-semibold">
      Lending:
    </span>{" "}
    Contact Owner for details
  </p>
)}
<p>
  <span className="font-semibold">
    Type:
  </span>{" "}
  {item.type}
</p>
                  <p>
                    <span className="font-semibold">
                      Status:
                    </span>{" "}
                    {item.status}
                  </p>
                </div>

                <div className="flex gap-2">
                  {item.status !== "sold" && (
                    <button
                      onClick={() =>
                        handleMarkSold(item._id)
                      }
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Mark Sold
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyItems;