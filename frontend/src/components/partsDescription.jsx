import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/LaptopDetails.css'
import Navbar from "../navbar";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function DisplayPart() {
  const { id } = useParams();
  console.log("Part ID:", id); // Debugging line
  const [part, setPart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchPartInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/retrieveById/${id}`);
        setPart(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPartInfo();
  }, [id]);

  const handleAddToCart = async () => {
    const userSession = sessionStorage.getItem("user");
  
    if (!userSession) {
      alert("Please log in to add items to your cart.");
      return;
    }
  
    const user = JSON.parse(userSession); // Parse session data
    const userId = user._id; // Get user ID
  
    try {
      const response = await axios.post("http://localhost:5000/add/part", {
        userId,
        partId: part._id,
        category: part.category,
        price: part.price,
        quantity,
      });
  
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
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
            <img className="laptop-details-image" src={part.image || "default-laptop.jpg"} alt={part.model} />
          </div>
    
          <div className="laptop-details-right">
            <h2 className="laptop-details-title">{part.brand} - {part.model}</h2>
    
            <p className="laptop-details-price">Rs. {part.price}</p>
    
            <div className="laptop-details-quantity">
              <button onClick={decreaseQuantity}>−</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
    
            <button className="laptop-details-cart-button" onClick={handleAddToCart}><MdOutlineShoppingCart /> Add to Cart</button>
    
            <h3 className="laptop-details-features-title">Key Features</h3>
            <ul className="laptop-details-features-list">
              <li><strong>Category:</strong> {part.category}</li>
              <li><strong>Model:</strong> {part.model}</li>
              <li><strong>Description:</strong> {part.description}</li>
              <li><strong>Warranty:</strong> 1 Year</li>
            </ul>
          </div>
        </div>
        </>
  );
}
