import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import "./styles/Checkout.css"; // Updated styles

export default function CheckoutDetails() {
  const { checkoutId } = useParams();
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/checkout/${checkoutId}`);
        setCheckout(response.data);
      } catch (error) {
        setError("Failed to load checkout details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();
  }, [checkoutId]);

  if (loading) return <p>Loading checkout details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cd-container">
      <Navbar />
      <h1 className="cd-title">Checkout Details</h1>

      <div className="cd-summary-box">
        <h2>Order ID: {checkout._id}</h2>
        <p><strong>User:</strong> {checkout.user}</p>
        <p><strong>Status:</strong> {checkout.status}</p>
        <p><strong>Expected Delivery:</strong> {new Date(checkout.expectedDeliveryDate).toDateString()}</p>
      </div>

      {/* Laptops */}
      {checkout.laptops.length > 0 && (
        <div>
          <h2 className="cd-section-title">Laptops</h2>
          <div className="cd-item-grid">
            {checkout.laptops.map((laptop, index) => (
              <div key={index} className="cd-item-box">
                <img src={laptop.part.image} alt={laptop.part.name} className="cd-image" />
                <div className="cd-details">
                  <h3>{laptop.part.name}</h3>
                  <p>Price: Rs. {laptop.price}</p>
                  <p>Quantity: {laptop.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parts */}
      {Object.keys(checkout.parts).map((category) =>
        checkout.parts[category].length > 0 ? (
          <div key={category}>
            <h2 className="cd-section-title">{category}</h2>
            <div className="cd-item-grid">
              {checkout.parts[category].map((part, index) => (
                <div key={index} className="cd-item-box">
                  <img src={part.part.image} alt={part.part.name} className="cd-image" />
                  <div className="cd-details">
                    <h3>{part.part.name}</h3>
                    <p>Price: Rs. {part.price}</p>
                    <p>Quantity: {part.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}

      {/* Price Summary */}
      <div className="cd-summary-box">
        <h2>Price Summary</h2>
        <p><strong>Subtotal:</strong> Rs. {checkout.totalPrice}</p>
        <p><strong>Shipping Cost:</strong> Rs. {checkout.shippingCost}</p>
        <p><strong>Tax (10%):</strong> Rs. {(checkout.totalPrice * checkout.tax).toFixed(2)}</p>
        <p><strong>Discount:</strong> Rs. {checkout.discount}</p>
        <h3>Total Amount: Rs. {(checkout.totalPrice + checkout.shippingCost + checkout.totalPrice * checkout.tax - checkout.discount).toFixed(2)}</h3>
      </div>
    </div>
  );
}
