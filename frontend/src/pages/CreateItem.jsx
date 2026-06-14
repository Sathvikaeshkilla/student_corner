import { useState } from "react";
import { createItem } from "../api/itemApi";
import { useNavigate } from "react-router-dom";

function CreateItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("sell");
  const [condition, setCondition] = useState("Good");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("condition", condition);
    formData.append("image", image);

    await createItem(formData);

    alert("Item Created Successfully");

    navigate("/marketplace");
  } catch (error) {
    console.log(error);
    alert("Failed to create item");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold mb-6">
          Create Item
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Item Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 h-28"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="sell">Sell</option>
            <option value="lend">Lend</option>
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
          <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full border rounded-lg p-3"
/>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Item
          </button>

        </div>
      </div>
    </div>
  );
}

export default CreateItem;