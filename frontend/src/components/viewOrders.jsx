import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar"; // Adjust the path as needed

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
        <h1 style={{ padding: "2rem 0" }}>Orders: </h1>
        <p>No orders found.</p>
      </div>
    );
  }

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ padding: "2rem 0" }}>Orders: </h1>
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
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              margin: "1rem",
              cursor: "pointer",
            }}
            onClick={() => handleOrderClick(order._id)}
          >
            <h2>
              <strong>Order ID:</strong> {order._id}
            </h2>
            <p>
              <strong>Final Total:</strong> Rs. {finalTotal}
            </p>
            <p>
              <strong>Expected Delivery Date:</strong> {new Date(order.expectedDeliveryDate).toLocaleDateString()}
            </p>

            {isExpanded && (
              <div>
                <p>
                  <strong>Total Price:</strong> Rs. {order.totalPrice}
                </p>
                <p>
                  <strong>Shipping Cost:</strong> Rs. {order.shippingCost}
                </p>
                <p>
                  <strong>Tax:</strong> {order.tax * 100}%
                </p>
                <p>
                  <strong>Discount:</strong> {order.discount * 100}%
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>

                {order.laptops && order.laptops.length > 0 && (
                  <div>
                    <h3>Laptops:</h3>
                    <ul>
                      {order.laptops.map((laptopItem) => (
                        <li key={laptopItem.part}>
                          {laptopItem.part} : Rs. {laptopItem.price} x {laptopItem.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {order.parts && Object.keys(order.parts).length > 0 && (
                  <div>
                    <h3>Parts:</h3>
                    {Object.keys(order.parts).map((category) => (
                      <div key={category}>
                        <h4>{category}:</h4>
                        <ul>
                          {order.parts[category].map((partItem) => (
                            <li key={partItem.part._id}>
                              {partItem.part} : Rs. {partItem.price} x {partItem.quantity}
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