import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import './styles/laptop.css'

export default function LaptopList() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    const fetchLaptops = async () => {
      const response = await axios.get("http://localhost:5000/all-laptops");
      setLaptops(response.data);
    };

    fetchLaptops();
  }, []);

  return (
    <>
      <Navbar />
      <div className="laptop-container">
        {laptops.map((laptop, index) => (
          <div className="laptop-card" key={index}>
            <div className="laptop-image-container">
              <img src={laptop.image || "default-laptop.jpg"} className="laptop-image" alt={laptop.model} />
            </div>
            <div className="laptop-details">
              <p className="laptop-model">{laptop.model}</p>
              <p className="laptop-price">Rs. {laptop.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
