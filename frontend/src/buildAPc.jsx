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

  
  // Fetch parts by category
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
  
  // Handle search change
  const handleSearch = (category, value) => {
    setSearchQuery((prev) => ({ ...prev, [category]: value }));
  };
  
  // Handle part selection/deselection
  const handleSelect = (category, partName) => {
    setFormData((prev) => {
      if (category === "Other") {
        const updatedOther = prev.Other.includes(partName)
        ? prev.Other.filter((item) => item !== partName) // Remove from "Other" if already selected
        : [...prev.Other, partName]; // Add to "Other" if not selected
        return { ...prev, Other: updatedOther };
      }

      return {
        ...prev,
        [category]: prev[category] === partName ? "" : partName, // Deselect if already selected
      };
    });
  };
  
  //ADD LATER
  
  // const navigate = useNavigate();
  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   navigate("/checkout", { state: formData }); // Redirect to Checkout Page with form data
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
                  ? formData.Other.join(", ") || "Not selected"
                  : formData[cat] || "Not selected"}
              </span>
            </h3>

            <input
              type="text"
              placeholder={`Search ${cat}...`}
              value={searchQuery[cat] || ""}
              onChange={(e) => handleSearch(cat, e.target.value)}
            />

            <ul>
              {parts[cat]
                ?.filter((part) =>
                  part.name.toLowerCase().includes((searchQuery[cat] || "").toLowerCase())
                )
                .map((part) => (
                  <li
                    key={part._id}
                    onClick={() => handleSelect(cat, part.name)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        (formData[cat] === part.name || formData.Other.includes(part.name))
                          ? "#d3f9d8"
                          : "",
                    }}
                  >
                    {part.name}
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
