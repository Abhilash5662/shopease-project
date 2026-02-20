import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    fetch("http://127.0.0.1:8000/api/orders/")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Please Login</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">


      <div className="profile-card">
        <h2>My Account</h2>

        <div className="profile-grid">
          <div>
            <label>Email</label>
            <p>{user.email}</p>
          </div>


        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="orders-card">
        <h3>Order History</h3>

        {orders.length === 0 ? (
          <p className="empty">No orders yet</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-box">

              <div className="order-header">
                <span>Order #{order.id}</span>

                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>

              {order.items?.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.product}</span>
                  <span>× {item.quantity}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default ProfilePage;
