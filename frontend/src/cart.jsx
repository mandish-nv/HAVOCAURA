import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { MdRemoveShoppingCart } from "react-icons/md";

export default function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      const userSession = sessionStorage.getItem("user");
      if (!userSession) {
        setError("Please log in to view your cart.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userSession); // Parse session data
      const userId = user._id; // Get user ID

      try {
        const response = await axios.get(`http://localhost:5000/cart/${userId}`);
        setCartItems(response.data.cart);
        setTotalPrice(response.data.totalPrice);
      } catch (err) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleRemoveItem = async (itemId, category) => {
    const userSession = sessionStorage.getItem("user");
    if (!userSession) {
      alert("Please log in to remove items from your cart.");
      return;
    }

    const user = JSON.parse(userSession);
    const userId = user._id;

    try {
      await axios.post("http://localhost:5000/cart/remove", { userId, itemId, category });
      setCartItems(cartItems.filter(item => item._id !== itemId)); // Remove item from state
    } catch (err) {
      alert("Failed to remove item from cart.");
    }
  };

  const handleQuantityChange = async (itemId, category, action) => {
    const userSession = sessionStorage.getItem("user");
    if (!userSession) {
      alert("Please log in to update item quantity.");
      return;
    }

    const user = JSON.parse(userSession);
    const userId = user._id;

    try {
      await axios.post("http://localhost:5000/cart/update", {
        userId,
        itemId,
        category,
        action,
      });
      // Re-fetch updated cart data
      await fetchCartData();
    } catch (err) {
      alert("Failed to update item quantity.");
    }
  };

  const handleCheckout = async () => {
    const userSession = sessionStorage.getItem("user");
    if (!userSession) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    const user = JSON.parse(userSession);
    const userId = user._id;

    try {
      await axios.post("http://localhost:5000/checkout", { userId, cartItems, totalPrice });
      alert("Checkout successful!");
      setCartItems([]);
      setTotalPrice(0);
    } catch (err) {
      alert("Failed to proceed with checkout.");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <h1 style={{ padding: "2rem 0" }}>Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div>
                  <p>{item.name}</p>
                  <p>Price: Rs. {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <div>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.category, "increase")}
                  >
                    + Increase
                  </button>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.category, "decrease")}
                  >
                    - Decrease
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id, item.category)}
                    style={{ color: "red" }}
                  >
                    <MdRemoveShoppingCart /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: Rs. {totalPrice}</h3>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
