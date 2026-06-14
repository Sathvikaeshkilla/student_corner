import { useEffect, useState, useContext } from "react";
import { getItems } from "../api/itemApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Marketplace() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] =
    useState("All");
  const [selectedCondition, setSelectedCondition] =
    useState("All");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();

        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "All" ||
      item.type === selectedType;

    const matchesCondition =
      selectedCondition === "All" ||
      item.condition === selectedCondition;

    return (
      matchesSearch &&
      matchesType &&
      matchesCondition
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Marketplace
          </h1>

          {user && (
            <div className="flex gap-4">
              <button
                onClick={() =>
                  navigate("/create-item")
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Item
              </button>

              <button
                onClick={() =>
                  navigate("/my-items")
                }
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
              >
                My Items
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6 grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search title or description..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="border rounded-lg p-3"
          />

          <select
            value={selectedType}
            onChange={(e) =>
              setSelectedType(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option value="All">
              All Types
            </option>
            <option value="sell">
              Sell
            </option>
            <option value="lend">
              Lend
            </option>
          </select>

          <select
            value={selectedCondition}
            onChange={(e) =>
              setSelectedCondition(
                e.target.value
              )
            }
            className="border rounded-lg p-3"
          >
            <option value="All">
              All Conditions
            </option>
            <option value="Excellent">
              Excellent
            </option>
            <option value="Good">
              Good
            </option>
            <option value="Average">
              Average
            </option>
            <option value="Poor">
              Poor
            </option>
          </select>

        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            No items found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h2 className="text-xl font-semibold mb-2">
                  {item.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="space-y-1 mb-4">

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
                      Contact Owner
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

                <button
                  onClick={() =>
                    navigate(
                      `/items/${item._id}`
                    )
                  }
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;