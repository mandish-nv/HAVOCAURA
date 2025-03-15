import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="laptop-container">
      {laptops.map((laptop, index) => (
        <div className="laptop-card" key={index}>
          <img src={laptop.image || "default-laptop.jpg"} />
          <p>{laptop.brand}</p>
          <p>{laptop.model}</p>
        </div>
      ))}
    </div>
  );
}
