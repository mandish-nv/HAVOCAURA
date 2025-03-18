import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/LaptopDetails.css";
import Navbar from "../navbar";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function DisplayLaptop() {
  const { id } = useParams();
  const [laptop, setLaptop] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchLaptopInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/retrieveById/${id}`);
        setLaptop(response.data);
        console.log(laptop)
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchLaptopInfo();
  }, [id]);

  const handleAddToCart = () => {
    alert(`${quantity} x ${laptop.model} added to cart!`);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  if (loading) return <p className="laptop-details-loading">Loading laptop details...</p>;
  if (error) return <p className="laptop-details-error">Error: {error}</p>;

  return (
    <>    
    <Navbar/>
    <div className="laptop-details-container">
      <div className="laptop-details-left">
        <img className="laptop-details-image" src={laptop.image || "default-laptop.jpg"} alt={laptop.name} />
      </div>

      <div className="laptop-details-right">
        <h2 className="laptop-details-title">{laptop.brand} {laptop.model}</h2>

        <p className="laptop-details-price">Rs. {laptop.price}</p>

        <div className="laptop-details-quantity">
          <button onClick={decreaseQuantity}>−</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>

        <button className="laptop-details-cart-button" onClick={handleAddToCart}><MdOutlineShoppingCart /> Add to Cart</button>

        <h3 className="laptop-details-features-title">Key Features</h3>
        <ul className="laptop-details-features-list">
          <li><strong>Processor:</strong> {laptop.Processor}</li>
          <li><strong>RAM:</strong> {laptop.RAM}</li>
          <li><strong>Storage:</strong> {laptop.Storage}</li>
          <li><strong>Display:</strong> {laptop['Screen Size']}</li>
          <li><strong>Graphics:</strong> {laptop.graphicsCard}</li>
          <li><strong>OS:</strong> {laptop.operatingSystem}</li>
          <li><strong>Warranty:</strong> 1 Year</li>
        </ul>
      </div>
    </div>
    </>

  );
}
