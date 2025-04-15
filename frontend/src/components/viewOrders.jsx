import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar"; // Adjust the path as needed
import "../styles/Orders.css"; // Updated styles

export default function ViewOrders() {
  const userSession = sessionStorage.getItem("user");
  const user = JSON.parse(userSession);
  const userId = user._id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Track expanded order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/viewOrders/${userId}` // Use the detailed route
        );
        
        setOrders(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div>
        <Navbar />
        <h1 className="vo-title">Orders: </h1>
        <p>No orders found.</p>
      </div>
    );
  }

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="vo-container">
      <Navbar />
      <h1 className="vo-title">Orders: </h1>
      {orders.map((order) => {
        const finalTotal =
          order.totalPrice +
          order.shippingCost +
          order.totalPrice * order.tax -
          order.totalPrice * order.discount;
        const isExpanded = expandedOrderId === order._id;

        return (
          <div
            key={order._id}
            className="vo-order-box"
            onClick={() => handleOrderClick(order._id)}
          >
            <h2 className="vo-order-id">
              <strong>Order ID:</strong> {order._id}
            </h2>
            <p className="vo-final-total">
              <strong>Final Total:</strong> Rs. {finalTotal}
            </p>
            <p className="vo-delivery-date">
              <strong>Expected Delivery Date:</strong>{" "}
              {new Date(order.expectedDeliveryDate).toLocaleDateString()}
            </p>

            {isExpanded && (
              <div className="vo-expanded-details">
                <p className="vo-total-price">
                  <strong>Total Price:</strong> Rs. {order.totalPrice}
                </p>
                <p className="vo-shipping-cost">
                  <strong>Shipping Cost:</strong> Rs. {order.shippingCost}
                </p>
                <p className="vo-tax">
                  <strong>Tax:</strong> {order.tax * 100}%
                </p>
                <p className="vo-discount">
                  <strong>Discount:</strong> {order.discount * 100}%
                </p>
                <p className="vo-status">
                  <strong>Status:</strong> {order.status}
                </p>

                {order.laptops && order.laptops.length > 0 && (
                  <div className="vo-laptops">
                    <h3>Laptops:</h3>
                    <ul className="vo-laptop-list">
                      {order.laptops.map((laptopItem) => (
                        <li key={laptopItem.part._id} className="vo-laptop-item">
                          {laptopItem.part.model} : Rs. {laptopItem.part.price} x{" "}
                          {laptopItem.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {order.parts && Object.keys(order.parts).length > 0 && (
                  <div className="vo-parts">
                    <h3>Parts:</h3>
                    {Object.keys(order.parts).map((category) => (
                      <div key={category}>
                        <h4>{category}:</h4>
                        <ul className="vo-part-list">
                          {order.parts[category].map((partItem) => (
                            <li key={partItem.part._id} className="vo-part-item">
                              {partItem.part.model} : Rs. {partItem.part.price} x{" "}
                              {partItem.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
