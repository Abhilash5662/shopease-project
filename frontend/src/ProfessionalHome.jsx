import React, { useEffect, useState } from "react";
import "./ProfessionalHome.css";
import { Link } from "react-router-dom";

function ProfessionalHome() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);



  const loadProducts = () => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        console.log("Products:", data);
        setProducts(data);
      })
      .catch(err => console.error("API ERROR:", err));
  };



  const loadCart = () => {
    fetch("http://127.0.0.1:8000/api/cart/")
      .then(res => res.json())
      .then(data => {
        console.log("Cart:", data);
        setCartCount(data.items?.length || 0);
      })
      .catch(err => console.error("Cart Error:", err));
  };

  const addToCart = (productId) => {
    fetch("http://127.0.0.1:8000/api/cart/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        /*alert("Added to Cart ✅");*/
        loadCart();
      })
      .catch(err => console.error("Add Cart Error:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="page">

      <header className="navbar">
        <Link to="/" className="logo">ShopEase</Link>

        <input
          className="search"
          type="text"
          placeholder="Search products"
        />

        <nav className="nav-items">
          {user ? (
            <>
              <Link to="/profile">My Account</Link>

              <span className="logout" onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <Link to="/cart" className="cart">
            Cart ({cartCount})
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Discover Amazing Products</h1>
          <p>Best prices. Fast delivery. Trusted by millions.</p>
          <button>Shop Now</button>
        </div>
      </section>

      <section className="products-section">
        <h2>Featured Products</h2>

        <div className="products">
          {products.length === 0 ? (
            <p className="empty">No products available</p>
          ) : (
            products.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="card-link"
              >
                <div className="card">

                  <img
                    src={
                      product.image
                        ? `http://127.0.0.1:8000${product.image}`
                        : "https://via.placeholder.com/200"
                    }
                    alt={product.title}
                  />

                  <h4>{product.title}</h4>
                  <p>₹{product.price}</p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product.id);
                    }}
                  >
                    Add to Cart
                  </button>

                </div>
              </Link>
            ))
          )}
        </div>
      </section>

    </div>
  );
}

export default ProfessionalHome;