import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import "./styles/cart.css";

export default function CartList() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user._id;

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      setCart(response.data.cart);
    } catch (error) {
      setError("Failed to load cart");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  useEffect(() => {
    if (cart) {
      calculateTotal(cart);
    }
  }, [cart]);

  const calculateTotal = (cart) => {
    let total = 0;
    cart?.laptops?.forEach((laptop) => {
      total += laptop.price * laptop.quantity;
    });
    Object.values(cart?.parts || {}).forEach((partList) => {
      partList.forEach((part) => {
        total += part.price * part.quantity;
      });
    });
    setTotalAmt(total);
  };

  const handleRemoveItem = async (itemId, category, partCategory) => {
    try {
      // First, create a checkout cart (this might be the same operation as removing the item from the cart)
      await axios.post("http://localhost:5000/checkout/create/cart", { userId });
  
      // Now remove the item from the cart
      const response = await axios.post("http://localhost:5000/cart/remove", {
        userId,
        itemId,
        category,
        partCategory,
      });
  
      alert(response.data.message);
  
      // After removing the item, fetch the updated cart
      fetchCart(); // Ensure this function updates the UI after cart removal
  
    } catch (error) {
      console.error(error);
      alert("Failed to remove item from cart");
    }
  };
  

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
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to update cart");
    }
  };

  const handleProceedToCheckout = async () => {
    const purchaseOrderId = `${userId}-${Date.now()}`; // unique per session
    const order = {
      return_url: `http://localhost:5173`,
      website_url: "http://localhost:5173",
      amount: totalAmt * 100,
      purchase_order_name: "Computer Parts Order",
      purchase_order_id: purchaseOrderId,
    };
    
    try { 
      const responses = await axios.post("http://localhost:5000/checkout/create/cart", {
        userId,
      });
      alert(responses.data.message);
      const response = await fetch("https://dev.khalti.com/api/v2/epayment/initiate/", {
        method: "POST",
        headers: {
          Authorization: "Key 3ff9d57a2a5340c7a1401fe71f2f57f8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
  
      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url; // Send user to Khalti
      } else {
        console.error(data);
        alert("Failed to initiate Khalti payment");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1 style={{ padding: "2rem 0", textAlign: "center" }}>Cart</h1>

      {error && <p>{error}</p>}
      {!cart ? (
        <p style={{ textAlign: "center" }}>Loading cart...</p>
      ) : (
        <div className="cart-main">
          <div className="cart-left">
            {/* Cart Items */}
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
                      <button onClick={() => handleUpdateQuantity(laptop._id, "laptop", null, "increase")}>+</button>
                      <button onClick={() => handleUpdateQuantity(laptop._id, "laptop", null, "decrease")}>-</button>
                      <button onClick={() => handleRemoveItem(laptop._id, "laptop", null)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {Object.keys(cart.parts).map((partCategory) =>
              cart.parts[partCategory].length > 0 ? (
                <div key={partCategory}>
                  <h2>{partCategory} in Cart</h2>
                  {cart.parts[partCategory].map((part) => (
                    <div key={part._id} className="cart-item">
                      <img src={part.part.image} alt={part.part.name} />
                      <div>
                        <h3>{part.part.model}</h3>
                        <p>Price: Rs. {part.price}</p>
                        <p>Quantity: {part.quantity}</p>
                        <button onClick={() => handleUpdateQuantity(part._id, "part", partCategory, "increase")}>+</button>
                        <button onClick={() => handleUpdateQuantity(part._id, "part", partCategory, "decrease")}>-</button>
                        <button onClick={() => handleRemoveItem(part._id, "part", partCategory)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              {cart?.laptops.map((laptop) => (
                <div key={laptop._id} className="summary-item">
                  <span>
                    {laptop.part.model} × {laptop.quantity}
                  </span>
                  <span>Rs. {laptop.price * laptop.quantity}</span>
                </div>
              ))}
              {Object.values(cart?.parts || {}).flat().map((part) => (
                <div key={part._id} className="summary-item">
                  <span>
                    {part.part.model} × {part.quantity}
                  </span>
                  <span>Rs. {part.price * part.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>Rs. {totalAmt}</strong>
            </div>
            <button className="checkout-btn" onClick={handleProceedToCheckout}>
              Pay With Khalti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
