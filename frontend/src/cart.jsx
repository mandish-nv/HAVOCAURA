import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar"; // Assuming you have a Navbar component

export default function CartList() {
  const [cart, setCart] = useState(null); // Holds the cart data
  const [error, setError] = useState(""); // Holds error message

  const userSession = sessionStorage.getItem("user");
  const user = JSON.parse(userSession); // Parse session data
  const userId = user._id; // Get user ID

  // Fetch cart data from the backend
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cart/${userId}`
      );
      setCart(response.data.cart); // Store the fetched cart data
    } catch (error) {
      setError("Failed to load cart");
      console.error(error);
    }
  };

  // Fetch the cart on mount
  useEffect(() => {
    fetchCart();
  }, [userId]);

  // Handle item removal
  const handleRemoveItem = async (itemId, category, partCategory) => {
    try {
      const response = await axios.post("http://localhost:5000/cart/remove", {
        userId,
        itemId,
        category,
        partCategory,
      });
      alert(response.data.message);
      // Refresh the cart after item removal
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to remove item from cart");
    }
  };

  // Handle quantity update
  const handleUpdateQuantity = async (
    itemId,
    category,
    partCategory,
    action
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/cart/update", {
        userId,
        itemId,
        category,
        action,
        partCategory,
      });
      alert(response.data.message);
      // Refresh the cart after updating quantity
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to update cart");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ padding: "2rem 0" }}>Cart</h1>

      {error && <p>{error}</p>}
      {!cart ? (
        <p>Loading cart...</p>
      ) : (
        <div>
          {/* Laptops Section - Only show if there are laptops in the cart */}
          {cart.laptops.length > 0 && (
            <div>
              <h2>Laptops in Cart</h2>
              {cart.laptops.map((laptop) => (
                <div key={laptop._id} className="cart-item">
                  <img src={laptop.part.image} alt={laptop.part.model} />
                  <div>
                    <h3>{laptop.part.model}</h3>
                    <p>Price: Rs. {laptop.price}</p>
                    <p>Quantity: {laptop.quantity}</p>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          laptop._id,
                          "laptop",
                          null,
                          "increase"
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          laptop._id,
                          "laptop",
                          null,
                          "decrease"
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        handleRemoveItem(laptop._id, "laptop", null)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Parts Section - Only show if there are parts in the cart */}
          {/* Modify this to not show titles of empty objects */}
          {Object.keys(cart.parts).length > 0 && (
            <div>
              {Object.keys(cart.parts).map((partCategory) => (
                <div key={partCategory}>
                  <h2>{partCategory} in Cart</h2>
                  {cart.parts[partCategory].map((part) => (
                    <div key={part._id} className="cart-item">
                      <img src={part.part.image} alt={part.part.name} />
                      <div>
                        <h3>{part.part.name}</h3>
                        <p>Price: Rs. {part.price}</p>
                        <p>Quantity: {part.quantity}</p>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              part._id,
                              "part",
                              partCategory,
                              "increase"
                            )
                          }
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              part._id,
                              "part",
                              partCategory,
                              "decrease"
                            )
                          }
                        >
                          -
                        </button>
                        <button
                          onClick={() =>
                            handleRemoveItem(part._id, "part", partCategory)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Only show the Proceed to Checkout button if the cart is not empty */}
          {cart.laptops.length > 0 || Object.keys(cart.parts).length > 0 ? (
            <button>Proceed to Checkout</button>
          ) : (
            <p>Your cart is empty. Add some items to proceed.</p>
          )}
        </div>
      )}
    </div>
  );
}
