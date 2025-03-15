import { useState } from "react";
import axios from "axios";

export default function LaptopForm() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    graphicsCard: "",
    screenSize: "",
    operatingSystem: "",
    price: "",
    description: "",
    image: "",
  });

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
        "http://localhost:5000/api/laptops",
        formData
      );
      console.log("Laptop added:", response.data);

      // Reset form after successful submission
      setFormData({
        brand: "",
        model: "",
        processor: "",
        ram: "",
        storage: "",
        graphicsCard: "",
        screenSize: "",
        operatingSystem: "",
        price: "",
        description: "",
        image: "",
      });

      alert("Laptop added successfully!");
    } catch (error) {
      console.error("Error adding laptop:", error);
      alert("Failed to add laptop.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Laptop</h2>
      <form onSubmit={handleSubmit}>
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <br />

        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <br />

        <label>Processor:</label>
        <input
          type="text"
          name="processor"
          value={formData.processor}
          onChange={handleChange}
          required
        />
        <br />

        <label>RAM:</label>
        <input
          type="text"
          name="ram"
          value={formData.ram}
          onChange={handleChange}
          required
        />
        <br />

        <label>Storage:</label>
        <input
          type="text"
          name="storage"
          value={formData.storage}
          onChange={handleChange}
          required
        />
        <br />

        <label>Graphics Card:</label>
        <input
          type="text"
          name="graphicsCard"
          value={formData.graphicsCard}
          onChange={handleChange}
        />
        <br />

        <label>Screen Size:</label>
        <input
          type="text"
          name="screenSize"
          value={formData.screenSize}
          onChange={handleChange}
          required
        />
        <br />

        <label>Operating System:</label>
        <input
          type="text"
          name="operatingSystem"
          value={formData.operatingSystem}
          onChange={handleChange}
        />
        <br />

        <label>Price ($):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <br />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <br />

        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Add Laptop</button>
      </form>
    </div>
  );
}
