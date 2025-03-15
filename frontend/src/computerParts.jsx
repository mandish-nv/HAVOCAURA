import { useEffect, useState } from "react";
import axios from "axios";

export default function ComputerParts() {
  const [parts, setParts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
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

  const fetchParts = async (category) => {
    const response = await axios.get(
      `http://localhost:5000/all-parts?category=${category}`
    );
    setParts(response.data);
  };

  useEffect(() => {
    fetchParts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <nav className="navbar">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="parts-container">
        {parts.length === 0 ? (
          <p>No data available</p>
        ) : (
          parts.map((part, index) => (
            <div className="part-card" key={index}>
              <img src={part.image || "default-part.jpg"} alt={part.name} />
              <h3>{part.name}</h3>
              <p>{part.category}</p>
              <p>{part.brand} - {part.model}</p>
              <p>💲{part.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
