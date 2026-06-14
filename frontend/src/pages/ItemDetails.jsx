import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../api/itemApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ItemDetails() {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(itemId);

        setItem(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <img
  src={item.imageUrl}
  alt={item.title}
  className="w-full h-96 object-cover rounded-xl mb-6"
/>
          <h1 className="text-4xl font-bold mb-6">
            {item.title}
          </h1>

          <p className="text-gray-700 mb-6">
            {item.description}
          </p>

          <div className="space-y-3 text-lg">
            {item.type === "sell" ? (
              <p>
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
                Contact owner for details
              </p>
            )}

            <p>
              <span className="font-semibold">
                Condition:
              </span>{" "}
              {item.condition}
            </p>

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

          {item.status !== "sold" &&
            user?._id !== item.owner && (
              <button
                onClick={() =>
                  navigate(
                    `/chat/${item._id}/${item.owner}`
                  )
                }
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Contact Owner
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;