import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

export default function CheckoutDetails() {
  const { checkoutId } = useParams(); // Get checkoutId from URL
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
    <div>
      <Navbar />
      <h1>Checkout Details</h1>

      <div className="checkout-summary">
        <h2>Order ID: {checkout._id}</h2>
        <p><strong>User:</strong> {checkout.user}</p>
        <p><strong>Status:</strong> {checkout.status}</p>
        <p><strong>Expected Delivery:</strong> {new Date(checkout.expectedDeliveryDate).toDateString()}</p>
      </div>

      {/* Laptops in Checkout */}
      {checkout.laptops.length > 0 && (
        <div>
          <h2>Laptops</h2>
          {checkout.laptops.map((laptop) => (
            <div key={laptop._id} className="checkout-item">
              <div>
                <h3>{laptop.part}</h3>
                <p>Price: Rs. {laptop.price}</p>
                <p>Quantity: {laptop.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Parts in Checkout */}
      {Object.keys(checkout.parts).map((partCategory) =>
        checkout.parts[partCategory].length > 0 ? (
          <div key={partCategory}>
            <h2>{partCategory}</h2>
            {checkout.parts[partCategory].map((part) => (
              <div key={part._id} className="checkout-item">
                <div>
                  <h3>{part.part}</h3>
                  <p>Price: Rs. {part.price}</p>
                  <p>Quantity: {part.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null
      )}

      {/* Pricing Details */}
      <div className="checkout-summary">
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
