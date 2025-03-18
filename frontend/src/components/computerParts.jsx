import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/part.css'
import { Link } from "react-router-dom";

export default function ComputerParts() {
  const [parts, setParts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "CPU",
    "GPU",
    "Motherboard",
    "RAM",
    "SSD",
    "HDD",
    "Cooling System",
    "Case",
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
    <div className="computer-parts-container">
      <nav className="navbar">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="parts-list">
        {parts.length === 0 ? (
          <p className="no-data-message">No data available</p>
        ) : (
          parts.map((part, index) => (
            <div className="part-card" key={index}>
              <div className="part-image-container">
                <img src={part.image || "default-part.jpg"} alt={part.name} />
              </div>
              <div className="part-details">
                <h3>{part.name}</h3>
                <p className="category">{part.category}</p>
                <p className="brand-model"><Link to={`/partdescription/${part._id}`} className="link">{part.brand} - {part.model}</Link></p>
                <p className="price">Rs. {part.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
