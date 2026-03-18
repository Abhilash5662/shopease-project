import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    fetch("https://shopease-project-1-6fip.onrender.com/api/products/")
      .then(res => res.json())
      .then(data => {
        console.log("Cart Data:", data);
        setCartItems(data.items || []);
      })
      .catch(err => console.error("Cart Error:", err));
  };

  const removeItem = (itemId) => {
    fetch("https://shopease-project-1-6fip.onrender.com/api/cart/remove/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: itemId }),
    })
      .then(res => res.json())
      .then(() => loadCart())
      .catch(err => console.error("Remove Error:", err));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * Number(item.product_price),
      0
    );
  };

  const updateQuantity = (itemId, action) => {
    fetch("https://shopease-project-1-6fip.onrender.com/api/cart/update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        action: action,
      }),
    })
      .then(res => res.json())
      .then(() => loadCart())   
      .catch(err => console.error("Quantity Error:", err));
  };






  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* LEFT SIDE – ITEMS */}
        <div className="cart-items-section">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">

                <img
                  src={`https://shopease-project-1-6fip.onrender.com${item.product_image}`}
                  alt={item.product}
                />

                <div className="item-info">
                  <h4>{item.product}</h4>
                  <p className="price">₹{item.product_price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, "decrease")}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item.id, "increase")}>+</button>
                  </div>


                  <p className="subtotal">
                    Subtotal: ₹{(item.quantity * Number(item.product_price)).toFixed(2)}
                  </p>

                  <button onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE – SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <button className="checkout">Proceed to Checkout</button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default CartPage;
