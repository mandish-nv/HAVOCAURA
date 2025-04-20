import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/buildaPC.css";
import Navbar from "./navbar";

export default function BuildAPc() {
  const userSession = sessionStorage.getItem("user");
  const user = JSON.parse(userSession);
  const userId = user._id;

  const [formData, setFormData] = useState({
    "CPU": "",
    "GPU": "",
    "Motherboard": "",
    "RAM": "",
    "SSD": "",
    "HDD": "",
    "Cooling System": "",
    "Case": "",
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

  const handleSelect = (category, partId) => {
    setFormData((prev) => ({
      ...prev,
      [category]: partId,
    }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const category of categories) {
      const selectedPartId = formData[category];
      const selectedPart = parts[category]?.find((part) => part._id === selectedPartId);
      if (selectedPart) {
        total += selectedPart.price;
      }
    }
    return total;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = calculateTotalPrice();
    const purchaseOrderId = `${userId}-${Date.now()}`;

    const order = {
      return_url: `http://localhost:5173`,
      website_url: "http://localhost:5173",
      amount: total * 100, // Khalti expects paisa (not rupees)
      purchase_order_name: "Computer Parts Order",
      purchase_order_id: purchaseOrderId,
    };

    try {
      const responses = await axios.post("http://localhost:5000/checkout/create/buildAPc", {
        userId,
        formData,
      });

      const response = await fetch("https://dev.khalti.com/api/v2/epayment/initiate/", {
        method: "POST",
        headers: {
          Authorization: "Key c9e386b2fcb94bdfa335cb95a8ffadc7",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        console.error(data);
        alert("Failed to initiate Khalti payment");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const getSelectedPartImage = (category) => {
    const selectedPartId = formData[category];
    const selectedPart = parts[category]?.find((part) => part._id === selectedPartId);
    return selectedPart ? selectedPart.image : "";
  };

  return (
    <>
      <Navbar />
      <div className="build-pc-container">
        <h1 className="page-title">Build Your Dream PC</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="build-form">
          {categories.map((cat, index) => (
            <div key={index} className="category-container">
              <h3 className="category-title">
                {cat}:{" "}
                <span className={formData[cat] ? "selected-text" : "not-selected"}>
                  {formData[cat] ? "Item selected" : "Not selected"}
                </span>
              </h3>

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

          <h2 className="total-price">Total Price: Rs.{calculateTotalPrice()}</h2>

          <button type="submit" className="checkout-button" onClick={handleSubmit}>
            Proceed to Checkout
          </button>
        </form>
      </div>
    </>
  );
}
