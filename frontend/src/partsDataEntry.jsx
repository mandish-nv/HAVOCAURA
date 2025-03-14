import { useState } from "react";
import axios from "axios";

export default function ComputerPartForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    price: "",
    specifications: "",
    description: "",
    image: "",
  });

  const categories = [
    "CPU",
    "GPU",
    "Motherboard",
    "RAM",
    "Storage",
    "Power Supply",
    "Cooling System",
    "Case",
    "Peripherals",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? (value ? parseFloat(value) : "") : value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/computer-parts",
        formData
      );
      console.log("Part added:", response.data);

      // Reset form after successful submission
      setFormData({
        name: "",
        category: "",
        brand: "",
        model: "",
        price: "",
        specifications: "",
        description: "",
        image: "",
      });

      alert("Computer part added successfully!");
    } catch (error) {
      console.error("Error adding part:", error);
      alert("Failed to add computer part.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Computer Part</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br/>

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <br/>

        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <br/>

        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <br/>

        <label>Price ($):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <br/>

        <label>Specifications:</label>
        <textarea
          name="specifications"
          value={formData.specifications}
          onChange={handleChange}
        ></textarea>
        <br/>

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <br/>

        <label>Image:</label>
        <input
          type="file"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <br/>

        <button type="submit">Add Part</button>
      </form>
    </div>
  );
}
