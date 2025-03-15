import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [searchQuery, setSearchQuery] = useState({});
  
  const categories = [
    "CPU",
    "GPU",
    "Motherboard",
    "RAM",
    "Storage",
    "Power_Supply",
    "Cooling_System",
    "Case",
    "Peripherals",
    "Other",
  ];
  
  // ✅ Fetch Parts from Database
  const fetchPartsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/retrieveByCategory/${category}`);
      setParts((prev) => ({ ...prev, [category]: response.data }));
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    }
  };
  
  useEffect(() => {
    categories.forEach((cat) => fetchPartsByCategory(cat));
  }, []);

  // ✅ Handle Search Input
  const handleSearch = (category, value) => {
    setSearchQuery((prev) => ({ ...prev, [category]: value }));
  };
  
  // ✅ Handle Part Selection
  const handleSelect = (category, partId) => {
    setFormData((prev) => {
      if (category === "Other") {
        const updatedOther = prev.Other.includes(partId)
        ? prev.Other.filter((id) => id !== partId) // Deselect item
        : [...prev.Other, partId]; // Select item
        return { ...prev, Other: updatedOther };
      }
      return {
        ...prev,
        [category]: prev[category] === partId ? "" : partId, // Deselect if already selected
      };
    });
  };
  
  //ADD LATER

  // ✅ Submit Form and Redirect to Checkout Page
  // const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   navigate("/checkout", { state: formData });
  // };
  
  return (
    <div>
      <h1>Build a PC</h1>
      <form>
        {/* onSubmit={handleSubmit} */}
        {categories.map((cat, index) => (
          <div key={index} style={{ paddingBottom: "4rem" }}>
            <h3>
              {cat}:{" "}
              <span>
                {cat === "Other"
                  ? formData.Other.length > 0
                    ? `${formData.Other.length} item(s) selected`
                    : "Not selected"
                  : formData[cat]
                    ? "Item selected"
                    : "Not selected"}
              </span>
            </h3>

            {/* 🔎 Search Bar */}
            <input
              type="text"
              placeholder={`Search ${cat}...`}
              value={searchQuery[cat] || ""}
              onChange={(e) => handleSearch(cat, e.target.value)}
            />

            {/* ✅ List of Available Parts */}
            <ul>
              {parts[cat]
                ?.filter((part) =>
                  part.name.toLowerCase().includes((searchQuery[cat] || "").toLowerCase())
                )
                .map((part) => (
                  <li
                    key={part._id}
                    onClick={() => handleSelect(cat, part._id)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        (formData[cat] === part._id || formData.Other.includes(part._id))
                          ? "#d3f9d8"
                          : "",
                    }}
                  >
                    {part.name+"\t"}
                    {"$"+part.price}
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <button type="submit">Proceed to Checkout</button>
      </form>
    </div>
  );
}
