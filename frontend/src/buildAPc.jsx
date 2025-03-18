import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/buildaPC.css";
import Navbar from "./navbar";

export default function BuildAPc() {
  const [formData, setFormData] = useState({
    CPU: "",
    GPU: "",
    Motherboard: "",
    RAM: "",
    Storage: "",
    Power_Supply: "",
    Cooling_System: "",
    Case: "",
    Peripherals: "",
    Other: [],
  });

  const [parts, setParts] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const categories = [
    "CPU",
    "GPU",
    "Motherboard",
    "RAM",
    "SSD",
    "HDD",
    "Cooling System",
    "Case",
  ];

  // Fetch parts by category from the API
  const fetchPartsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/retrieveByCategory/${category}`);
      setParts((prev) => ({ ...prev, [category]: response.data }));
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      setErrorMessage(`Failed to load ${category} parts. Please try again later.`);
      setParts((prev) => ({ ...prev, [category]: [] }));
    }
  };

  useEffect(() => {
    categories.forEach((cat) => fetchPartsByCategory(cat));
  }, []);

  // Handle part selection
  const handleSelect = (category, partId) => {
    setFormData((prev) => {
      if (category === "Other") {
        const updatedOther = prev.Other.includes(partId)
          ? prev.Other.filter((id) => id !== partId)
          : [...prev.Other, partId];
        return { ...prev, Other: updatedOther };
      }
      return {
        ...prev,
        [category]: partId,
      };
    });
  };

  // Handle form submission
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/checkout", { state: formData });
  };

  // Function to get the selected part details
  const getSelectedPartImage = (category) => {
    const selectedPartId = formData[category];
    const selectedPart = parts[category]?.find((part) => part._id === selectedPartId);
    return selectedPart ? selectedPart.image : "";
  };

  return (
    <>
    <Navbar/>
    <div className="build-pc-container">
      <h1 className="page-title">Build Your Dream PC</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="build-form">
        {categories.map((cat, index) => (
          <div key={index} className="category-container">
            <h3 className="category-title">
              {cat}:{" "}
              <span className={formData[cat] ? "selected-text" : "not-selected"}>
                {cat === "Other"
                  ? formData.Other.length > 0
                    ? `${formData.Other.length} item(s) selected`
                    : "Not selected"
                  : formData[cat]
                  ? "Item selected"
                  : "Not selected"}
              </span>
            </h3>

            {/* Dropdown for Part Selection */}
            <div className="dropdown-container">
              <select
                value={formData[cat] || ""}
                onChange={(e) => handleSelect(cat, e.target.value)}
                className="dropdown-select"
              >
                <option value="">Select a {cat}</option>
                {parts[cat]?.map((part) => (
                  <option key={part._id} value={part._id}>
                    {part.model} - Rs.{part.price}
                  </option>
                ))}
              </select>

              {/* Display the image of the selected part */}
              <div className="selected-part-image">
                {formData[cat] && (
                  <img
                    src={getSelectedPartImage(cat)}
                    alt="Selected Part"
                    className="selected-part-img"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className="checkout-button">Proceed to Checkout</button>
      </form>
    </div>
    </>
  );
}
